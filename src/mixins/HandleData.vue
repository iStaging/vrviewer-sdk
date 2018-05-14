<script>
import { getPath, isObject } from '@/api/utils'

export default {
  methods: {
    /**
     * @param data = [target array]
     * @param sort = {
     *   key: 'updatedAt',
     *   order: -1
     * }
     * @param filter = {
     *   key: 'name', // or keys: ['name', 'updatedAt'],
     *   value: this.searchValue
     * }
     * @param showNumber = show how many items in array
     */
    filterBy (data = [], sort = { key: '', order: '' }, filter = { key: '', value: '' }, showNumber = data.length) {
      if (filter && filter.key) {
        filter.value = filter.value.toLowerCase()
        data = data.filter(function (row) {
          if (row[filter.key]) {
            return row[filter.key].toLowerCase().indexOf(filter.value) > -1
          }
        })
      } else if (filter.keys && filter.keys.length) {
        filter.value = filter.value.toLowerCase()
        const res = []
        for (let i = 0, l = data.length; i < l; i++) {
          let item = data[i]
          let val = (item && item.$value) || item
          let j = filter.keys.length
          if (j) {
            while (j--) {
              let key = filter.keys[j]
              if ((key === '$key' && contains(item.$key, filter.value)) ||
                contains(getPath(val, key), filter.value)) {
                res.push(item)
                break
              }
            }
          } else if (contains(item, filter.value)) {
            res.push(item)
          }
        }
        data = res
      }
      if (sort && sort.key) {
        data = data.slice().sort(function (a, b) {
          a = a[sort.key]
          b = b[sort.key]
          return (a === b ? 0 : a > b ? 1 : -1) * sort.order
        })
      }
      if (showNumber) {
        data = data.splice(0, showNumber)
      }
      return data
    },

    // use it with i-repeat model, inner v-for needs slot have item[key]
    filterItem (array = [], key = '') {
      return array.filter(item => !item.hidden).map(item => item[key])
    }
  }
}

function contains (val, search) {
  if (!val) {
    return
  }
  let i
  if (isObject(val)) {
    const keys = Object.keys(val)
    i = keys.length
    while (i--) {
      if (contains(val[keys[i]], search)) {
        return true
      }
    }
  } else if (Array.isArray(val)) {
    i = val.length
    while (i--) {
      if (contains(val[i], search)) {
        return true
      }
    }
  } else if (val !== null && val !== undefined) {
    return val.toString().toLowerCase().indexOf(search) > -1
  }
}
</script>
