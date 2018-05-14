import RepliesManager from './replies-manager'

export default class CommentsManager {
  factory (commentsObj = {}, user = {}) {
    const commentsIdsArr = Object.keys(commentsObj || '{}')
    this.comments = new Array(commentsIdsArr.length)
    commentsIdsArr.forEach((commentId, index) => {
      const comment = commentsObj[commentId]
      const repliesObj = comment.replies
      if (repliesObj) {
        const replies = new RepliesManager()
        replies.factory(repliesObj, user)
        comment.replies = replies.getReplies()
      }
      this.add(comment, index)
    })
  }

  add (comment, index) {
    if (index !== undefined) {
      this.comments[index] = comment
    } else {
      this.comments.push(comment)
    }
  }

  getComments () {
    return this.comments
  }
}
