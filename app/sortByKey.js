function getKeyValue(key, obj) {
  const keyParts = key.split('.').filter(k => k.length);
  return keyParts.reduce((r, i) => {
    if (r[i] == null) {
      r[i] = {};
    }
    return r[i];
  }, obj);
}

function asc_cmp(a, b) {
  const type = typeof(a);
  if (type === 'string') {
    return a.localeCompare(b);
  } else {
    return a - b;
  }
}

function desc_cmp(a, b) {
  return asc_cmp(a, b) * -1;
}

function sortArray(arr, key, DESC) {
  const cmp = DESC ? desc_cmp : asc_cmp;
  return arr.sort((a, b) => {
    const values = [
      getKeyValue(key, a),
      getKeyValue(key, b)
    ];
    return cmp(values[0], values[1]);
  })
}

function sortbyKey(obj, key, DESC) {
  const arraysToSort = key.split('$.').filter(k => k.length);

  if (arraysToSort.length === 0) {
    const cmp = DESC ? desc_cmp : asc_cmp;
    return obj.sort(cmp);
  }
  if (arraysToSort.length === 1) {
    return sortArray(obj, arraysToSort[0], DESC);
  }

  const isArray = Array.isArray(obj);
  const nextKey = '$.' + arraysToSort.slice(1).join('$.');

  if (isArray) {
    obj.forEach((_obj) => {
      let child = getKeyValue(arraysToSort[0], _obj);
      child = sortbyKey(child, nextKey, DESC);
    });
  } else {
    let child = getKeyValue(arraysToSort[0], obj);
    child = sortbyKey(child, nextKey, DESC);
  }
  return obj;
}

module.exports = sortbyKey;
