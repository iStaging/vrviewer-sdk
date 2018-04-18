import { markerAlpha } from '@/krpano/xml/common'
import { isRtl } from '@/common/helpers'
import { getIEVersion } from '@/common/utils'
import krpanoConstants from '@/krpano/krpano-constants'

const getActionsXml = function (panoramas, startIndex = 0) {
  try {
    this.getAutoRotateSettings
  } catch (e) {
    throw new Error('getActionsXml must use getActionsXml.call(this, ...arg)')
  }
  const autoRotateSettings = this.getAutoRotateSettings()
  const initViewSettings = this.getInitViewSettings()
  const showPlanetView = initViewSettings.active
  return `<action name="startup">
  ${(() => {
    return process.env.NODE_ENV === 'development'
      ? 'showlog();'
      : ''
  })()}
  ${(() => {
    if (showPlanetView) {
      return `loadscene(first_panorama_${panoramas[startIndex].objectId});
      planet_view();`
    }
    return `loadscene(panorama_${panoramas[startIndex].objectId});`
  })()}
  set(plugin[gyro].enabled, false);
</action>

<action name="first_panorama_ready">
<!-- first panorama is vlookat 90, then turn to vlookat 0
  鳥瞰視角進入後向前看
-->
  normal_view();
  set(plugin[gyro].enabled, %1);
  wait(1);
  jscall(calc('krpano.hooks.startAutoRotate()'));
</action>

<action name="look_straight">
if (view.vlookat LT -80 OR view.vlookat GT +80, tween(view.vlookat, 0.0, 1.0, easeInOutSine); tween(view.fov, ${krpanoConstants.getDefaultFov()}, distance(150, 0.8)););
</action>

<action name="normal_view">
  look_straight();
  tween(view.architectural, 0.0, distance(2.0,1.5));
  tween(view.pannini, 0.0, distance(2.0,1.5));
  tween(view.fisheye, 0.0, distance(2.0,1.5));
</action>

<action name="planet_view">
<!-- start planet view -->
  lookat(${(panoramas[startIndex].panoramaRotation ? -panoramas[startIndex].panoramaRotation.y : 0) + krpanoConstants.getKrpanoXOffset()}, 90, 150);
  set(view.architectural, 0.0);
  set(view.pannini, 0.0);
  set(view.fisheye, 1.0);
</action>

<action name="auto_rotate">
<!-- start auto rotate -->
  tween(view.hlookat, calc(view.hlookat - 360), ${autoRotateSettings.rotateDuration / 1000}, linear, auto_rotate());
</action>

<action name="stop_auto_rotate">
<!-- stop auto rotate -->
  stoptween(view.hlookat);
</action>

<action name="prepare_change_scene">
<!-- 儲存當前仰角 All javascript call this action to trigger change scene here first
  %1 = next scene name
  %2 = next scene objectId
  %3 = selectedMethod
  %4 = next scene hlookat offset (for marker)
  %5 = is clicked from marker point
  %6 = marker ath
-->
<!-- 把 vr 裡的 marker 對應 info 顯示/隱藏 -->
  set(style[vr_panorama_style].scale, 0);
  ${(() => {
    let result = ''
    let calc = '+'
    if (isRtl()) {
      calc = '-'
    }
    for (let i = 0; i < panoramas.length; i++) {
      let horizontalCount = Math.floor(i / 4)
      result += `hotspot[vr_panorama_${i}].loadstyle(vr_panorama_style);
hotspot[vr_panorama_text_${i}].loadstyle(vr_panorama_style);
set(hotspot[vr_panorama_${i}].ath, calc(view.hlookat ${calc} ${krpanoConstants.getVrThumbAth() * horizontalCount}));
set(hotspot[vr_panorama_text_${i}].ath, calc(view.hlookat ${calc} ${krpanoConstants.getVrThumbAth() * horizontalCount}));`
    }
    return result
  })()}
  jscall(calc('krpano.hooks.prepareChangeScene("%1", "%2", "%3", "%4", %5, %6)'));
</action>

<action name="change_scene">
<!--
change scene in krpano, and callback to javascript (auto call it from prepare_change_scene)
%1 ~ %6 is all same with prepare_change_scene
%7 = newIndex
%8 = oldIndex
%9 = oldHLookat
%10 is gyro enabled
-->
  jscall(calc('krpano.hooks.stopAutoRotate()'));
  if (%10 == true, set(plugin[gyro].enabled, false);); <!-- 切換場景時 Gyro 需要先關閉，切換後設定好 h 視角，再打開 -->
  if (webvr.isenabled AND webvr.headtracking == true, set(webvr.headtracking, false););

  jscall(calc('krpano.hooks.changeImage("%2", "%3", %5, ' + webvr.isenabled + ')'));
  def(prevVlookat, number, calc(view.vlookat)); <!-- 儲存當前仰角 -->
  def(prevHlookat, number, calc(view.hlookat)); <!-- 儲存當前視角 -->

  if (%5,
  ${(() => {
    if (getIEVersion()) {
      return 'loadscene(%1, null, MERGE, BLEND(1));'
    } else {
      // non-IE do 3.js moving
      return `jscall(calc('krpano.hooks.threeJsMoving(%4, %6, %7, %8, %9)'));
    loadscene(%1, null, MERGE, BLEND(0.3));`
    }
  })()},
  loadscene(%1, null, MERGE, BLEND(1));
  );
  <!-- 把 vr 裡的 marker 對應 info 顯示/隱藏 -->
  if(webvr.isenabled, ${(() => {
    let result = ''
    const krpanoVrModeObj = krpanoConstants.getKrpanoVrModeObj()
    krpanoVrModeObj.vrModeShouldShow.forEach(item => {
      result += ` set(hotspot[${item}].visible,true);`
    })
    krpanoVrModeObj.vrModeShouldHide.forEach(item => {
      result += ` set(hotspot[${item}].visible,false);`
    })
    return result
  })()});

  set(view.vlookat, calc(prevVlookat)); <!-- 使用前一個 camera 仰角 -->
  if (%4, set(view.hlookat, calc(%4 - (%6 - prevHlookat))));
  if (%10, set(plugin[gyro].enabled, true);); <!-- 若有啟動 Gyro，在這裡要重新打開 -->
  if (webvr.isenabled AND webvr.headtracking == false, set(webvr.headtracking, true););

  <!-- 判斷下一個場景是否是 isTopLogo，要切換顯示 -->
  if (scene[get(xml.scene)].name == '%1' AND scene[get(xml.scene)].isTopLogo == 'true',
  set(hotspot[topLogoTripod].visible, true);,
  set(hotspot[topLogoTripod].visible, false););

  ${(() => {
    if (!getIEVersion()) {
      return `if (%5,
      jscall(calc('krpano.hooks.threeJsMovingStop()')); wait(LOAD);,
      wait(LOAD););`
    } else {
      return `wait(LOAD);
  wait(BLEND);`
    }
  })()}

  <!-- 非 VR 模式時啟動自動旋轉 -->
  if ((webvr.isenabled == false AND webvr.isfake == true) OR
  (webvr.isenabled == false AND webvr.isfake == false),
    jscall(calc('krpano.hooks.startAutoRotate()')););
</action>

<action name="toggle_vr_menu">
<!-- toggle show/hide menu in vr mode -->
  if (style[vr_panorama_style].scale == 1,
    set(style[vr_panorama_style].scale, 0);,
    set(style[vr_panorama_style].scale, 1););
  ${(() => {
    let result = ''
    let calc = '+'
    if (isRtl()) {
      calc = '-'
    }
    for (let i = 0; i < panoramas.length; i++) {
      const horizontalCount = Math.floor(i / 4)
      result += `hotspot[vr_panorama_${i}].loadstyle(vr_panorama_style);
hotspot[vr_panorama_text_${i}].loadstyle(vr_panorama_style);
set(hotspot[vr_panorama_${i}].ath, calc(view.hlookat ${calc} ${krpanoConstants.getVrThumbAth() * horizontalCount}));
set(hotspot[vr_panorama_text_${i}].ath, calc(view.hlookat ${calc} ${krpanoConstants.getVrThumbAth() * horizontalCount}));`
    }
    return result
  })()}
</action>

<action name="nextscene_loop">
<!-- %1 Next Panorama: 1, Prev Panorama: -1 -->
  if(xml.scene != null AND scene.count GT 1,
    if (scene[get(xml.scene)].index == 0,
      add(newsceneindex, scene[get(xml.scene)].index, calc(%1 + 1));,
      add(newsceneindex, scene[get(xml.scene)].index, %1););
    sub(lastsceneindex, scene.count, 1);
    if(newsceneindex LT 1, copy(newsceneindex, lastsceneindex));
    if(newsceneindex GT lastsceneindex, set(newsceneindex, 1));
    def(selectedMethod, string, 'VrModePrev');
    if(%1 == 1, set(selectedMethod, 'VrModeNext'));
    prepare_change_scene(get(scene[get(newsceneindex)].name), get(scene[get(newsceneindex)].objectId), get(selectedMethod), 0);
  );
</action>

<action name="marker_mousein">
<!-- marker hover -->
  marker_fadein(%1);
  if(webvr.isenabled, if (%3 == tag, set(hotspot[markerInfoPhoto_%1].scale, 1);
    set(hotspot[markerInfoBg_%1].scale, 1);
    set(hotspot[markerInfoTitle_%1].scale, 1);
    set(hotspot[markerInfoDescription_%1].scale, 1);
    set(hotspot[markerInfoPrice_%1].scale, 1);,
    set(hotspot[markerInfo_%1].scale, 1););,
    spheretoscreen(hotspot[markerInfo_%1].ath, hotspot[markerInfo_%1].atv, mouseX, mouseY);
    jscall(calc('krpano.hooks.markerMousein(%2, ' + mouseX + ', ' + mouseY + ')')););
</action>

<action name="set_marker_info">
  jscall(calc('krpano.hooks.setMarkerInfo(%1)'));
</action>

<action name="marker_mouseout">
<!-- marker mouse leave -->
  marker_fadeout(%1);
  if(webvr.isenabled, if (%3 == tag, set(hotspot[markerInfoPhoto_%1].scale, 0);
    set(hotspot[markerInfoBg_%1].scale, 0);
    set(hotspot[markerInfoTitle_%1].scale, 0);
    set(hotspot[markerInfoDescription_%1].scale, 0);
    set(hotspot[markerInfoPrice_%1].scale, 0);,
    set(hotspot[markerInfo_%1].scale, 0););,
    jscall(calc('krpano.hooks.markerMouseout(%2)')););
</action>

<action name="marker_fadein">
<!-- marker alpha to 1 -->
  tween(hotspot[marker_%1].alpha, 1, .3, easeOutQuad);
</action>

<action name="marker_fadeout">
<!-- marker alpha to ${markerAlpha} -->
  tween(hotspot[marker_%1].alpha, ${markerAlpha}, .3, easeOutQuad);
</action>

<action name="change_camera">
<!-- camera moving listen -->
  jscall(calc('krpano.hooks.changeCamera(%1, %2)'));
</action>

<action name="handle_show_popup">
<!-- click popup marker show popup -->
  jscall(calc('krpano.hooks.handleShowPopup(%1)'));
</action>

<action name="webvr_onentervr">
  ${(() => {
    let result = ''
    const krpanoVrModeObj = krpanoConstants.getKrpanoVrModeObj()
    krpanoVrModeObj.vrModeShouldShow.forEach(item => { result += `set(hotspot[${item}].visible,true);` })
    krpanoVrModeObj.vrModeShouldHide.forEach(item => { result += `set(hotspot[${item}].visible,false);` })
    return result
  })()}
  jscall(calc('krpano.hooks.stopAutoRotate()'));
  webvr_showbuttons();
  webvr_hide_all_non_vr_layers();
  if(webvr.isfake, webvr_show_fakemode_info(true););
</action>

<action name="webvr_onexitvr">
  ${(() => {
    let result = ''
    const krpanoVrModeObj = krpanoConstants.getKrpanoVrModeObj()
    krpanoVrModeObj.vrModeShouldShow.forEach(item => { result += `set(hotspot[${item}].visible,false);` })
    krpanoVrModeObj.vrModeShouldHide.forEach(item => { result += `set(hotspot[${item}].visible,true);` })
    return result
  })()}
  stopdelayedcall(vr_button_fadeout);
  tween(layer[webvr_exitbutton].alpha,0);
  tween(layer[webvr_setupbutton].alpha,0);
  webvr_show_fakemode_info(false);
  webvr_restore_layers();
  jscall(calc('krpano.hooks.startAutoRotate()'));
</action>

<action name="vr_menu_following" type="Javascript" devices="html5"><![CDATA[
var hs1 = krpano.get("hotspot[vr_menu_bg]");
var hs2 = krpano.get("hotspot[vr_menu_l]");
var hs3 = krpano.get("hotspot[vr_menu]");
var hs4 = krpano.get("hotspot[vr_menu_r]");
if (!hs1.hovering && !hs2.hovering && !hs3.hovering && !hs4.hovering) {
  var f = 0.01;
  var h = krpano.view.hlookat;
  var v = krpano.view.vlookat;
  var hsh = hs1.ath;
  var hsv = hs1.atv;
  h = (h-(h|0)) + (((h|0)+360180)%360) - 180.0;
  hsh = (hsh-(hsh|0)) + (((hsh|0)+360180)%360) - 180.0;
  dh = h - hsh;
  dh += (dh>180) ? -360 : (dh<-180) ? 360 : 0
  hsh += dh*f;
  var a = Math.abs(v - hs1.atv) / 90.0;
  a = 0.5 * Math.max(1.0 - 2.0 * Math.sqrt(a), 0);
  v = v + 55.0 - v*1.5;
  hsv = hsv*(1-f) + v*f;
  hs1.alpha = a;
  if(!hs2.hovering) hs2.alpha = a;
  if(!hs3.hovering) hs3.alpha = a;
  if(!hs4.hovering) hs4.alpha = a;
  hs4.ath = hs3.ath = hs2.ath = hs1.ath = hsh;
  hs4.atv = hs3.atv = hs2.atv = hs1.atv = hsv;
}]]></action>

<action name="vr_menu_over">
callwith(hotspot[vr_menu_bg], tween(alpha|depth,1.0|650); );
callwith(hotspot[vr_menu_l], tween(alpha|depth,0.5|650); );
callwith(hotspot[vr_menu], tween(alpha|depth,0.5|650); );
callwith(hotspot[vr_menu_r], tween(alpha|depth,0.5|650); );
</action>

<action name="vr_menu_out">
if(hotspot[vr_menu].hovering == false,
  callwith(hotspot[vr_menu_bg], tween(alpha|depth,0.25|800); );
  callwith(hotspot[vr_menu_l], tween(alpha|depth,0.25|800); );
  callwith(hotspot[vr_menu], tween(alpha|depth,0.25|800); );
  callwith(hotspot[vr_menu_r], tween(alpha|depth,0.25|800); );
);
</action>

<action name="zoom_in">
tween(view.fov, calc(view.fov - 30), .3, easeOutQuad);
</action>

<action name="zoom_out">
tween(view.fov, calc(view.fov + 30), .3, easeOutQuad);
</action>

<layer name="webvr_exitbutton" keep="true" vr="true"
style="webvr_button_style"
html="Exit VR"
align="top" y="24"
autoalpha="true" alpha="0.0"
onclick="jscall(calc('krpano.hooks.exitVrMode()'));"
/>

<action name="start_gyro">
set('plugin[gyro].enabled', 'true');
</action>

<action name="stop_gyro">
set('plugin[gyro].enabled', 'false');
</action>

<action name="hover_closest_point_marker">
<!-- 得到公用參數 m_ath, m_atv -->
screentosphere(mouse.x, mouse.y, m_ath, m_atv);
jscall(calc('krpano.hooks.findClosestPointMarker(' + m_ath + ', ' + m_atv + ', krpano.hooks.hoverClosestPointMarker);'));
</action>

<action name="click_krpano_screen">
jscall(calc('krpano.hooks.clickKrpanoScreen();'));
</action>

<action name="enter_closest_point_marker">
<!-- 滑鼠點的位置 -->
screentosphere(mouse.x, mouse.y, m_ath, m_atv);
jscall(calc('krpano.hooks.findClosestPointMarker(' + m_ath + ', ' + m_atv + ', krpano.hooks.enterClosestPointMarker);'));
</action>`
}

export default getActionsXml
