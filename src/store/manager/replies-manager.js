export default class RepliesManager {
  factory (repliesObj = {}, user = {}) {
    const repliesIdsArr = Object.keys(repliesObj || '{}')
    this.replies = new Array(repliesIdsArr.length)
    repliesIdsArr.forEach((replyId, index) => {
      const reply = repliesObj[replyId]
      if (reply.userId === user.objectId) {
        reply.name = user.name
        reply.avatar = user.profileUrl
      }
      this.add(reply, index)
    })
  }

  add (reply, index) {
    if (index !== undefined) {
      this.replies[index] = reply
    } else {
      this.replies.push(reply)
    }
  }

  getReplies () {
    return this.replies
  }
}
