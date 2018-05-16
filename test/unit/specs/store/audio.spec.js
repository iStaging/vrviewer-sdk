import { getters, actions, mutations } from '@/store/modules/audio'
import { testAction } from '../App.spec'
const {
  audioEl,
  isAudioPlaying
} = getters
const {
  setAudioEl,
  playAudio,
  pauseAudio
} = actions
const {
  SET_AUDIO_EL,
  SET_AUDIO_STATUS
} = mutations

const Audio = function (src) {
  return {
    src,
    load: function () {},
    play: function () {},
    pause: function () {}
  }
}
const src = 'https://dn-0uhksb6k.qbox.me/0afaa98ee8cf4336d78f.mp3'
const audio = new Audio(src)
describe('store/modules/audio', () => {
  it('audioEl', () => {
    const state = {
      audioEl: audio
    }
    const result = audioEl(state, { audioEl })
    expect(result).to.equal(audio)
  })

  it('isAudioPlaying', () => {
    const state = {
      isAudioPlaying: false
    }
    const result = isAudioPlaying(state, { isAudioPlaying })
    expect(result).to.equal(false)
  })

  it('setAudioEl to null', done => {
    const state = {
      audioEl: null
    }
    testAction(setAudioEl, null, state, [
      { type: 'SET_AUDIO_STATUS', payload: false },
      { type: 'SET_AUDIO_EL', payload: null }
    ], undefined, done)
  })

  it('setAudioEl', done => {
    const state = {
      audioEl: null
    }
    testAction(setAudioEl, audio, state, [
      { type: 'SET_AUDIO_EL', payload: audio }
    ], undefined, done)
  })

  it('playAudio', done => {
    const state = {
      audioEl: audio,
      isAudioPlaying: false
    }
    testAction(playAudio, undefined, state, [
      { type: 'SET_AUDIO_STATUS', payload: true }
    ], undefined, done)
  })

  it('pauseAudio', done => {
    const state = {
      audioEl: audio,
      isAudioPlaying: true
    }
    testAction(pauseAudio, undefined, state, [
      { type: 'SET_AUDIO_STATUS', payload: false }
    ], undefined, done)
  })

  it('SET_AUDIO_EL', () => {
    const state = {
      audioEl: null
    }
    SET_AUDIO_EL(state, audio)
    expect(state.audioEl)
      .to.equal(audio)
  })

  it('SET_AUDIO_STATUS', () => {
    const state = {
      isAudioPlaying: false
    }
    SET_AUDIO_STATUS(state, true)
    expect(state.isAudioPlaying)
      .to.equal(true)
  })
})
