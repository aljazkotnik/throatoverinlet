(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var dragDropHandler = /*#__PURE__*/function () {
    function dragDropHandler() {
      _classCallCheck(this, dragDropHandler);
    } // constructor


    _createClass(dragDropHandler, [{
      key: "ondragdropped",
      value: function ondragdropped(loadeddata) {// Dummy placeholder function.
      } // ondragdropped

    }, {
      key: "loadfiles",
      value: function loadfiles(files) {
        // Loadfiles is a separate function so that it can b calld programatically.
        var obj = this; // Convert to support several files to be drag-dropped. The files are allowed to be processed in sequence, and drawn on the screen in sequence.

        files.forEach(function (file) {
          var url;

          if (file instanceof File) {
            url = URL.createObjectURL(file);
          } else {
            url = file;
          } // if


          fetch(url).then(function (res) {
            return res.json();
          }).then(function (json) {
            // Now we update the data and the app.
            obj.ondragdropped(json);
          }); // fetch  
        }); // forEach
      } // loadfiles

    }, {
      key: "ondrop",
      value: function ondrop(ev) {
        var obj = this; // Prevent default behavior (Prevent file from being opened)

        ev.preventDefault();
        var files = [];

        if (ev.dataTransfer.items) {
          for (var i = 0; i < ev.dataTransfer.items.length; i++) {
            // Use DataTransferItemList interface to access the file(s)
            // If dropped items aren't files, reject them
            if (ev.dataTransfer.items[i].kind === 'file') {
              files.push(ev.dataTransfer.items[i].getAsFile());
            } // if

          } // for

        } else {
          // Use DataTransfer interface to access the file(s)
          files = ev.dataTransfer.files;
        } // if


        obj.loadfiles(files);
      } // ondrop

    }, {
      key: "ondragover",
      value: function ondragover(ev) {
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
      } // ondragover

    }]);

    return dragDropHandler;
  }(); // dragDropHandler

  let array8 = arrayUntyped,
      array16 = arrayUntyped,
      array32 = arrayUntyped,
      arrayLengthen = arrayLengthenUntyped,
      arrayWiden = arrayWidenUntyped;
  if (typeof Uint8Array !== "undefined") {
    array8 = function(n) { return new Uint8Array(n); };
    array16 = function(n) { return new Uint16Array(n); };
    array32 = function(n) { return new Uint32Array(n); };

    arrayLengthen = function(array, length) {
      if (array.length >= length) return array;
      var copy = new array.constructor(length);
      copy.set(array);
      return copy;
    };

    arrayWiden = function(array, width) {
      var copy;
      switch (width) {
        case 16: copy = array16(array.length); break;
        case 32: copy = array32(array.length); break;
        default: throw new Error("invalid array width!");
      }
      copy.set(array);
      return copy;
    };
  }

  function arrayUntyped(n) {
    var array = new Array(n), i = -1;
    while (++i < n) array[i] = 0;
    return array;
  }

  function arrayLengthenUntyped(array, length) {
    var n = array.length;
    while (n < length) array[n++] = 0;
    return array;
  }

  function arrayWidenUntyped(array, width) {
    if (width > 32) throw new Error("invalid array width!");
    return array;
  }

  // An arbitrarily-wide array of bitmasks
  function bitarray(n) {
    this.length = n;
    this.subarrays = 1;
    this.width = 8;
    this.masks = {
      0: 0
    };

    this[0] = array8(n);
  }

  bitarray.prototype.lengthen = function(n) {
    var i, len;
    for (i = 0, len = this.subarrays; i < len; ++i) {
      this[i] = arrayLengthen(this[i], n);
    }
    this.length = n;
  };

  // Reserve a new bit index in the array, returns {offset, one}
  bitarray.prototype.add = function() {
    var m, w, one, i, len;

    for (i = 0, len = this.subarrays; i < len; ++i) {
      m = this.masks[i];
      w = this.width - (32 * i);
      // isolate the rightmost zero bit and return it as an unsigned int of 32 bits, if NaN or -1, return a 0 
      one = (~m & (m + 1)) >>> 0;

      if (w >= 32 && !one) {
        continue;
      }

      if (w < 32 && (one & (1 << w))) {
        // widen this subarray
        this[i] = arrayWiden(this[i], w <<= 1);
        this.width = 32 * i + w;
      }

      this.masks[i] |= one;

      return {
        offset: i,
        one: one
      };
    }

    // add a new subarray
    this[this.subarrays] = array8(this.length);
    this.masks[this.subarrays] = 1;
    this.width += 8;
    return {
      offset: this.subarrays++,
      one: 1
    };
  };

  // Copy record from index src to index dest
  bitarray.prototype.copy = function(dest, src) {
    var i, len;
    for (i = 0, len = this.subarrays; i < len; ++i) {
      this[i][dest] = this[i][src];
    }
  };

  // Truncate the array to the given length
  bitarray.prototype.truncate = function(n) {
    var i, len;
    for (i = 0, len = this.subarrays; i < len; ++i) {
      for (var j = this.length - 1; j >= n; j--) {
        this[i][j] = 0;
      }
    }
    this.length = n;
  };

  // Checks that all bits for the given index are 0
  bitarray.prototype.zero = function(n) {
    var i, len;
    for (i = 0, len = this.subarrays; i < len; ++i) {
      if (this[i][n]) {
        return false;
      }
    }
    return true;
  };

  // Checks that all bits for the given index are 0 except for possibly one
  bitarray.prototype.zeroExcept = function(n, offset, zero) {
    var i, len;
    for (i = 0, len = this.subarrays; i < len; ++i) {
      if (i === offset ? this[i][n] & zero : this[i][n]) {
        return false;
      }
    }
    return true;
  };

  // Checks that all bits for the given index are 0 except for the specified mask.
  // The mask should be an array of the same size as the filter subarrays width.
  bitarray.prototype.zeroExceptMask = function(n, mask) {
    var i, len;
    for (i = 0, len = this.subarrays; i < len; ++i) {
      if (this[i][n] & mask[i]) {
        return false;
      }
    }
    return true;
  };

  // Checks that only the specified bit is set for the given index
  bitarray.prototype.only = function(n, offset, one) {
    var i, len;
    for (i = 0, len = this.subarrays; i < len; ++i) {
      if (this[i][n] != (i === offset ? one : 0)) {
        return false;
      }
    }
    return true;
  };

  // Checks that only the specified bit is set for the given index except for possibly one other
  bitarray.prototype.onlyExcept = function(n, offset, zero, onlyOffset, onlyOne) {
    var mask;
    var i, len;
    for (i = 0, len = this.subarrays; i < len; ++i) {
      mask = this[i][n];
      if (i === offset)
        mask = (mask & zero) >>> 0;
      if (mask != (i === onlyOffset ? onlyOne : 0)) {
        return false;
      }
    }
    return true;
  };

  var xfilterArray = {
    array8: arrayUntyped,
    array16: arrayUntyped,
    array32: arrayUntyped,
    arrayLengthen: arrayLengthenUntyped,
    arrayWiden: arrayWidenUntyped,
    bitarray: bitarray
  };

  const filterExact = (bisect, value) => {
    return function(values) {
      var n = values.length;
      return [bisect.left(values, value, 0, n), bisect.right(values, value, 0, n)];
    };
  };

  const filterRange = (bisect, range) => {
    var min = range[0],
        max = range[1];
    return function(values) {
      var n = values.length;
      return [bisect.left(values, min, 0, n), bisect.left(values, max, 0, n)];
    };
  };

  const filterAll = values => {
    return [0, values.length];
  };

  var xfilterFilter = {
    filterExact,
    filterRange,
    filterAll
  };

  var cr_identity = d => {
    return d;
  };

  var cr_null = () =>  {
    return null;
  };

  var cr_zero = () => {
    return 0;
  };

  function heap_by(f) {

    // Builds a binary heap within the specified array a[lo:hi]. The heap has the
    // property such that the parent a[lo+i] is always less than or equal to its
    // two children: a[lo+2*i+1] and a[lo+2*i+2].
    function heap(a, lo, hi) {
      var n = hi - lo,
          i = (n >>> 1) + 1;
      while (--i > 0) sift(a, i, n, lo);
      return a;
    }

    // Sorts the specified array a[lo:hi] in descending order, assuming it is
    // already a heap.
    function sort(a, lo, hi) {
      var n = hi - lo,
          t;
      while (--n > 0) t = a[lo], a[lo] = a[lo + n], a[lo + n] = t, sift(a, 1, n, lo);
      return a;
    }

    // Sifts the element a[lo+i-1] down the heap, where the heap is the contiguous
    // slice of array a[lo:lo+n]. This method can also be used to update the heap
    // incrementally, without incurring the full cost of reconstructing the heap.
    function sift(a, i, n, lo) {
      var d = a[--lo + i],
          x = f(d),
          child;
      while ((child = i << 1) <= n) {
        if (child < n && f(a[lo + child]) > f(a[lo + child + 1])) child++;
        if (x <= f(a[lo + child])) break;
        a[lo + i] = a[lo + child];
        i = child;
      }
      a[lo + i] = d;
    }

    heap.sort = sort;
    return heap;
  }

  const h$1 = heap_by(cr_identity);
  h$1.by = heap_by;

  function heapselect_by(f) {
    var heap = h$1.by(f);

    // Returns a new array containing the top k elements in the array a[lo:hi].
    // The returned array is not sorted, but maintains the heap property. If k is
    // greater than hi - lo, then fewer than k elements will be returned. The
    // order of elements in a is unchanged by this operation.
    function heapselect(a, lo, hi, k) {
      var queue = new Array(k = Math.min(hi - lo, k)),
          min,
          i,
          d;

      for (i = 0; i < k; ++i) queue[i] = a[lo++];
      heap(queue, 0, k);

      if (lo < hi) {
        min = f(queue[0]);
        do {
          if (f(d = a[lo]) > min) {
            queue[0] = d;
            min = f(heap(queue, 0, k)[0]);
          }
        } while (++lo < hi);
      }

      return queue;
    }

    return heapselect;
  }


  const h = heapselect_by(cr_identity);
  h.by = heapselect_by; // assign the raw function to the export as well

  function bisect_by(f) {

    // Locate the insertion point for x in a to maintain sorted order. The
    // arguments lo and hi may be used to specify a subset of the array which
    // should be considered; by default the entire array is used. If x is already
    // present in a, the insertion point will be before (to the left of) any
    // existing entries. The return value is suitable for use as the first
    // argument to `array.splice` assuming that a is already sorted.
    //
    // The returned insertion point i partitions the array a into two halves so
    // that all v < x for v in a[lo:i] for the left side and all v >= x for v in
    // a[i:hi] for the right side.
    function bisectLeft(a, x, lo, hi) {
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (f(a[mid]) < x) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    }

    // Similar to bisectLeft, but returns an insertion point which comes after (to
    // the right of) any existing entries of x in a.
    //
    // The returned insertion point i partitions the array into two halves so that
    // all v <= x for v in a[lo:i] for the left side and all v > x for v in
    // a[i:hi] for the right side.
    function bisectRight(a, x, lo, hi) {
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (x < f(a[mid])) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }

    bisectRight.right = bisectRight;
    bisectRight.left = bisectLeft;
    return bisectRight;
  }

  const bisect = bisect_by(cr_identity);
  bisect.by = bisect_by; // assign the raw function to the export as well

  var permute = (array, index, deep) => {
    for (var i = 0, n = index.length, copy = deep ? JSON.parse(JSON.stringify(array)) : new Array(n); i < n; ++i) {
      copy[i] = array[index[i]];
    }
    return copy;
  };

  const reduceIncrement = p => {
    return p + 1;
  };

  const reduceDecrement = p => {
    return p - 1;
  };

  const reduceAdd = f => {
    return function(p, v) {
      return p + +f(v);
    };
  };

  const reduceSubtract = f => {
    return function(p, v) {
      return p - f(v);
    };
  };

  var xfilterReduce = {
    reduceIncrement,
    reduceDecrement,
    reduceAdd,
    reduceSubtract
  };

  function deep(t,e,i,n,r){for(r in n=(i=i.split(".")).splice(-1,1),i)e=e[i[r]]=e[i[r]]||{};return t(e,n)}

  // Note(cg): result was previsouly using lodash.result, not ESM compatible.
   
  const get$2 = (obj, prop) => {
    const value = obj[prop];
    return (typeof value === 'function') ? value.call(obj) : value;
  };

  /**
   * get value of object at a deep path.
   * if the resolved value is a function,
   * it's invoked with the `this` binding of 
   * its parent object and its result is returned. 
   *  
   * @param  {Object} obj  the object (e.g. { 'a': [{ 'b': { 'c1': 3, 'c2': 4} }], 'd': {e:1} }; )
   * @param  {String} path deep path (e.g. `d.e`` or `a[0].b.c1`. Dot notation (a.0.b)is also supported)
   * @return {Any}      the resolved value
   */
  const reg = /\[([\w\d]+)\]/g;
  var result = (obj, path) => {
    return deep(get$2, obj, path.replace(reg, '.$1'))
  };

  // constants
  var REMOVED_INDEX = -1;

  crossfilter.heap = h$1;
  crossfilter.heapselect = h;
  crossfilter.bisect = bisect;
  crossfilter.permute = permute;

  function crossfilter() {
    var crossfilter = {
      add: add,
      remove: removeData,
      dimension: dimension,
      groupAll: groupAll,
      size: size,
      all: all,
      allFiltered: allFiltered,
      onChange: onChange,
      isElementFiltered: isElementFiltered
    };

    var data = [], // the records
        n = 0, // the number of records; data.length
        filters, // 1 is filtered out
        filterListeners = [], // when the filters change
        dataListeners = [], // when data is added
        removeDataListeners = [], // when data is removed
        callbacks = [];

    filters = new xfilterArray.bitarray(0);

    // Adds the specified new records to this crossfilter.
    function add(newData) {
      var n0 = n,
          n1 = newData.length;

      // If there's actually new data to add…
      // Merge the new data into the existing data.
      // Lengthen the filter bitset to handle the new records.
      // Notify listeners (dimensions and groups) that new data is available.
      if (n1) {
        data = data.concat(newData);
        filters.lengthen(n += n1);
        dataListeners.forEach(function(l) { l(newData, n0, n1); });
        triggerOnChange('dataAdded');
      }

      return crossfilter;
    }

    // Removes all records that match the current filters, or if a predicate function is passed,
    // removes all records matching the predicate (ignoring filters).
    function removeData(predicate) {
      var // Mapping from old record indexes to new indexes (after records removed)
          newIndex = new Array(n),
          removed = [],
          usePred = typeof predicate === 'function',
          shouldRemove = function (i) {
            return usePred ? predicate(data[i], i) : filters.zero(i)
          };

      for (var index1 = 0, index2 = 0; index1 < n; ++index1) {
        if ( shouldRemove(index1) ) {
          removed.push(index1);
          newIndex[index1] = REMOVED_INDEX;
        } else {
          newIndex[index1] = index2++;
        }
      }

      // Remove all matching records from groups.
      filterListeners.forEach(function(l) { l(-1, -1, [], removed, true); });

      // Update indexes.
      removeDataListeners.forEach(function(l) { l(newIndex); });

      // Remove old filters and data by overwriting.
      for (var index3 = 0, index4 = 0; index3 < n; ++index3) {
        if ( newIndex[index3] !== REMOVED_INDEX ) {
          if (index3 !== index4) filters.copy(index4, index3), data[index4] = data[index3];
          ++index4;
        }
      }

      data.length = n = index4;
      filters.truncate(index4);
      triggerOnChange('dataRemoved');
    }

    function maskForDimensions(dimensions) {
      var n,
          d,
          len,
          id,
          mask = Array(filters.subarrays);
      for (n = 0; n < filters.subarrays; n++) { mask[n] = ~0; }
      for (d = 0, len = dimensions.length; d < len; d++) {
        // The top bits of the ID are the subarray offset and the lower bits are the bit
        // offset of the "one" mask.
        id = dimensions[d].id();
        mask[id >> 7] &= ~(0x1 << (id & 0x3f));
      }
      return mask;
    }

    // Return true if the data element at index i is filtered IN.
    // Optionally, ignore the filters of any dimensions in the ignore_dimensions list.
    function isElementFiltered(i, ignore_dimensions) {
      var mask = maskForDimensions(ignore_dimensions || []);
      return filters.zeroExceptMask(i,mask);
    }

    // Adds a new dimension with the specified value accessor function.
    function dimension(value, iterable) {

      if (typeof value === 'string') {
        var accessorPath = value;
        value = function(d) { return result(d, accessorPath); };
      }

      var dimension = {
        filter: filter,
        filterExact: filterExact,
        filterRange: filterRange,
        filterFunction: filterFunction,
        filterAll: filterAll,
        currentFilter: currentFilter,
        hasCurrentFilter: hasCurrentFilter,
        top: top,
        bottom: bottom,
        group: group,
        groupAll: groupAll,
        dispose: dispose,
        remove: dispose, // for backwards-compatibility
        accessor: value,
        id: function() { return id; }
      };

      var one, // lowest unset bit as mask, e.g., 00001000
          zero, // inverted one, e.g., 11110111
          offset, // offset into the filters arrays
          id, // unique ID for this dimension (reused when dimensions are disposed)
          values, // sorted, cached array
          index, // maps sorted value index -> record index (in data)
          newValues, // temporary array storing newly-added values
          newIndex, // temporary array storing newly-added index
          iterablesIndexCount,
          iterablesIndexFilterStatus,
          iterablesEmptyRows = [],
          sortRange = function(n) {
            return cr_range(n).sort(function(A, B) {
              var a = newValues[A], b = newValues[B];
              return a < b ? -1 : a > b ? 1 : A - B;
            });
          },
          refilter = xfilterFilter.filterAll, // for recomputing filter
          refilterFunction, // the custom filter function in use
          filterValue, // the value used for filtering (value, array, function or undefined)
          filterValuePresent, // true if filterValue contains something
          indexListeners = [], // when data is added
          dimensionGroups = [],
          lo0 = 0,
          hi0 = 0,
          t = 0,
          k;

      // Updating a dimension is a two-stage process. First, we must update the
      // associated filters for the newly-added records. Once all dimensions have
      // updated their filters, the groups are notified to update.
      dataListeners.unshift(preAdd);
      dataListeners.push(postAdd);

      removeDataListeners.push(removeData);

      // Add a new dimension in the filter bitmap and store the offset and bitmask.
      var tmp = filters.add();
      offset = tmp.offset;
      one = tmp.one;
      zero = ~one;

      // Create a unique ID for the dimension
      // IDs will be re-used if dimensions are disposed.
      // For internal use the ID is the subarray offset shifted left 7 bits or'd with the
      // bit offset of the set bit in the dimension's "one" mask.
      id = (offset << 7) | (Math.log(one) / Math.log(2));

      preAdd(data, 0, n);
      postAdd(data, 0, n);

      // Incorporates the specified new records into this dimension.
      // This function is responsible for updating filters, values, and index.
      function preAdd(newData, n0, n1) {
        var newIterablesIndexCount,
            newIterablesIndexFilterStatus;

        if (iterable){
          // Count all the values
          t = 0;
          j = 0;
          k = [];

          for (var i0 = 0; i0 < newData.length; i0++) {
            for(j = 0, k = value(newData[i0]); j < k.length; j++) {
              t++;
            }
          }

          newValues = [];
          newIterablesIndexCount = cr_range(newData.length);
          newIterablesIndexFilterStatus = cr_index(t,1);
          var unsortedIndex = cr_range(t);

          for (var l = 0, index1 = 0; index1 < newData.length; index1++) {
            k = value(newData[index1]);
            //
            if(!k.length){
              newIterablesIndexCount[index1] = 0;
              iterablesEmptyRows.push(index1 + n0);
              continue;
            }
            newIterablesIndexCount[index1] = k.length;
            for (j = 0; j < k.length; j++) {
              newValues.push(k[j]);
              unsortedIndex[l] = index1;
              l++;
            }
          }

          // Create the Sort map used to sort both the values and the valueToData indices
          var sortMap = sortRange(t);

          // Use the sortMap to sort the newValues
          newValues = permute(newValues, sortMap);


          // Use the sortMap to sort the unsortedIndex map
          // newIndex should be a map of sortedValue -> crossfilterData
          newIndex = permute(unsortedIndex, sortMap);

        } else {
          // Permute new values into natural order using a standard sorted index.
          newValues = newData.map(value);
          newIndex = sortRange(n1);
          newValues = permute(newValues, newIndex);
        }

        // Bisect newValues to determine which new records are selected.
        var bounds = refilter(newValues), lo1 = bounds[0], hi1 = bounds[1];

        var index2, index3, index4;
        if(iterable) {
          n1 = t;
          if (refilterFunction) {
            for (index2 = 0; index2 < n1; ++index2) {
              if (!refilterFunction(newValues[index2], index2)) {
                if(--newIterablesIndexCount[newIndex[index2]] === 0) {
                  filters[offset][newIndex[index2] + n0] |= one;
                }
                newIterablesIndexFilterStatus[index2] = 1;
              }
            }
          } else {
            for (index3 = 0; index3 < lo1; ++index3) {
              if(--newIterablesIndexCount[newIndex[index3]] === 0) {
                filters[offset][newIndex[index3] + n0] |= one;
              }
              newIterablesIndexFilterStatus[index3] = 1;
            }
            for (index4 = hi1; index4 < n1; ++index4) {
              if(--newIterablesIndexCount[newIndex[index4]] === 0) {
                filters[offset][newIndex[index4] + n0] |= one;
              }
              newIterablesIndexFilterStatus[index4] = 1;
            }
          }
        } else {
          if (refilterFunction) {
            for (index2 = 0; index2 < n1; ++index2) {
              if (!refilterFunction(newValues[index2], index2)) {
                filters[offset][newIndex[index2] + n0] |= one;
              }
            }
          } else {
            for (index3 = 0; index3 < lo1; ++index3) {
              filters[offset][newIndex[index3] + n0] |= one;
            }
            for (index4 = hi1; index4 < n1; ++index4) {
              filters[offset][newIndex[index4] + n0] |= one;
            }
          }
        }

        // If this dimension previously had no data, then we don't need to do the
        // more expensive merge operation; use the new values and index as-is.
        if (!n0) {
          values = newValues;
          index = newIndex;
          iterablesIndexCount = newIterablesIndexCount;
          iterablesIndexFilterStatus = newIterablesIndexFilterStatus;
          lo0 = lo1;
          hi0 = hi1;
          return;
        }



        var oldValues = values,
          oldIndex = index,
          oldIterablesIndexFilterStatus = iterablesIndexFilterStatus,
          old_n0,
          i1 = 0;

        i0 = 0;

        if(iterable){
          old_n0 = n0;
          n0 = oldValues.length;
          n1 = t;
        }

        // Otherwise, create new arrays into which to merge new and old.
        values = iterable ? new Array(n0 + n1) : new Array(n);
        index = iterable ? new Array(n0 + n1) : cr_index(n, n);
        if(iterable) iterablesIndexFilterStatus = cr_index(n0 + n1, 1);

        // Concatenate the newIterablesIndexCount onto the old one.
        if(iterable) {
          var oldiiclength = iterablesIndexCount.length;
          iterablesIndexCount = xfilterArray.arrayLengthen(iterablesIndexCount, n);
          for(var j=0; j+oldiiclength < n; j++) {
            iterablesIndexCount[j+oldiiclength] = newIterablesIndexCount[j];
          }
        }

        // Merge the old and new sorted values, and old and new index.
        var index5 = 0;
        for (; i0 < n0 && i1 < n1; ++index5) {
          if (oldValues[i0] < newValues[i1]) {
            values[index5] = oldValues[i0];
            if(iterable) iterablesIndexFilterStatus[index5] = oldIterablesIndexFilterStatus[i0];
            index[index5] = oldIndex[i0++];
          } else {
            values[index5] = newValues[i1];
            if(iterable) iterablesIndexFilterStatus[index5] = newIterablesIndexFilterStatus[i1];
            index[index5] = newIndex[i1++] + (iterable ? old_n0 : n0);
          }
        }

        // Add any remaining old values.
        for (; i0 < n0; ++i0, ++index5) {
          values[index5] = oldValues[i0];
          if(iterable) iterablesIndexFilterStatus[index5] = oldIterablesIndexFilterStatus[i0];
          index[index5] = oldIndex[i0];
        }

        // Add any remaining new values.
        for (; i1 < n1; ++i1, ++index5) {
          values[index5] = newValues[i1];
          if(iterable) iterablesIndexFilterStatus[index5] = newIterablesIndexFilterStatus[i1];
          index[index5] = newIndex[i1] + (iterable ? old_n0 : n0);
        }

        // Bisect again to recompute lo0 and hi0.
        bounds = refilter(values), lo0 = bounds[0], hi0 = bounds[1];
      }

      // When all filters have updated, notify index listeners of the new values.
      function postAdd(newData, n0, n1) {
        indexListeners.forEach(function(l) { l(newValues, newIndex, n0, n1); });
        newValues = newIndex = null;
      }

      function removeData(reIndex) {
        if (iterable) {
          for (var i0 = 0, i1 = 0; i0 < iterablesEmptyRows.length; i0++) {
            if (reIndex[iterablesEmptyRows[i0]] !== REMOVED_INDEX) {
              iterablesEmptyRows[i1] = reIndex[iterablesEmptyRows[i0]];
              i1++;
            }
          }
          iterablesEmptyRows.length = i1;
          for (i0 = 0, i1 = 0; i0 < n; i0++) {
            if (reIndex[i0] !== REMOVED_INDEX) {
              if (i1 !== i0) iterablesIndexCount[i1] = iterablesIndexCount[i0];
              i1++;
            }
          }
          iterablesIndexCount = iterablesIndexCount.slice(0, i1);
        }
        // Rewrite our index, overwriting removed values
        var n0 = values.length;
        for (var i = 0, j = 0, oldDataIndex; i < n0; ++i) {
          oldDataIndex = index[i];
          if (reIndex[oldDataIndex] !== REMOVED_INDEX) {
            if (i !== j) values[j] = values[i];
            index[j] = reIndex[oldDataIndex];
            if (iterable) {
              iterablesIndexFilterStatus[j] = iterablesIndexFilterStatus[i];
            }
            ++j;
          }
        }
        values.length = j;
        if (iterable) iterablesIndexFilterStatus = iterablesIndexFilterStatus.slice(0, j);
        while (j < n0) index[j++] = 0;

        // Bisect again to recompute lo0 and hi0.
        var bounds = refilter(values);
        lo0 = bounds[0], hi0 = bounds[1];
      }

      // Updates the selected values based on the specified bounds [lo, hi].
      // This implementation is used by all the public filter methods.
      function filterIndexBounds(bounds) {

        var lo1 = bounds[0],
            hi1 = bounds[1];

        if (refilterFunction) {
          refilterFunction = null;
          filterIndexFunction(function(d, i) { return lo1 <= i && i < hi1; }, bounds[0] === 0 && bounds[1] === values.length);
          lo0 = lo1;
          hi0 = hi1;
          return dimension;
        }

        var i,
            j,
            k,
            added = [],
            removed = [],
            valueIndexAdded = [],
            valueIndexRemoved = [];


        // Fast incremental update based on previous lo index.
        if (lo1 < lo0) {
          for (i = lo1, j = Math.min(lo0, hi1); i < j; ++i) {
            added.push(index[i]);
            valueIndexAdded.push(i);
          }
        } else if (lo1 > lo0) {
          for (i = lo0, j = Math.min(lo1, hi0); i < j; ++i) {
            removed.push(index[i]);
            valueIndexRemoved.push(i);
          }
        }

        // Fast incremental update based on previous hi index.
        if (hi1 > hi0) {
          for (i = Math.max(lo1, hi0), j = hi1; i < j; ++i) {
            added.push(index[i]);
            valueIndexAdded.push(i);
          }
        } else if (hi1 < hi0) {
          for (i = Math.max(lo0, hi1), j = hi0; i < j; ++i) {
            removed.push(index[i]);
            valueIndexRemoved.push(i);
          }
        }

        if(!iterable) {
          // Flip filters normally.

          for(i=0; i<added.length; i++) {
            filters[offset][added[i]] ^= one;
          }

          for(i=0; i<removed.length; i++) {
            filters[offset][removed[i]] ^= one;
          }

        } else {
          // For iterables, we need to figure out if the row has been completely removed vs partially included
          // Only count a row as added if it is not already being aggregated. Only count a row
          // as removed if the last element being aggregated is removed.

          var newAdded = [];
          var newRemoved = [];
          for (i = 0; i < added.length; i++) {
            iterablesIndexCount[added[i]]++;
            iterablesIndexFilterStatus[valueIndexAdded[i]] = 0;
            if(iterablesIndexCount[added[i]] === 1) {
              filters[offset][added[i]] ^= one;
              newAdded.push(added[i]);
            }
          }
          for (i = 0; i < removed.length; i++) {
            iterablesIndexCount[removed[i]]--;
            iterablesIndexFilterStatus[valueIndexRemoved[i]] = 1;
            if(iterablesIndexCount[removed[i]] === 0) {
              filters[offset][removed[i]] ^= one;
              newRemoved.push(removed[i]);
            }
          }

          added = newAdded;
          removed = newRemoved;

          // Now handle empty rows.
          if(refilter === xfilterFilter.filterAll) {
            for(i = 0; i < iterablesEmptyRows.length; i++) {
              if((filters[offset][k = iterablesEmptyRows[i]] & one)) {
                // Was not in the filter, so set the filter and add
                filters[offset][k] ^= one;
                added.push(k);
              }
            }
          } else {
            // filter in place - remove empty rows if necessary
            for(i = 0; i < iterablesEmptyRows.length; i++) {
              if(!(filters[offset][k = iterablesEmptyRows[i]] & one)) {
                // Was in the filter, so set the filter and remove
                filters[offset][k] ^= one;
                removed.push(k);
              }
            }
          }
        }

        lo0 = lo1;
        hi0 = hi1;
        filterListeners.forEach(function(l) { l(one, offset, added, removed); });
        triggerOnChange('filtered');
        return dimension;
      }

      // Filters this dimension using the specified range, value, or null.
      // If the range is null, this is equivalent to filterAll.
      // If the range is an array, this is equivalent to filterRange.
      // Otherwise, this is equivalent to filterExact.
      function filter(range) {
        return range == null
            ? filterAll() : Array.isArray(range)
            ? filterRange(range) : typeof range === "function"
            ? filterFunction(range)
            : filterExact(range);
      }

      // Filters this dimension to select the exact value.
      function filterExact(value) {
        filterValue = value;
        filterValuePresent = true;
        return filterIndexBounds((refilter = xfilterFilter.filterExact(bisect, value))(values));
      }

      // Filters this dimension to select the specified range [lo, hi].
      // The lower bound is inclusive, and the upper bound is exclusive.
      function filterRange(range) {
        filterValue = range;
        filterValuePresent = true;
        return filterIndexBounds((refilter = xfilterFilter.filterRange(bisect, range))(values));
      }

      // Clears any filters on this dimension.
      function filterAll() {
        filterValue = undefined;
        filterValuePresent = false;
        return filterIndexBounds((refilter = xfilterFilter.filterAll)(values));
      }

      // Filters this dimension using an arbitrary function.
      function filterFunction(f) {
        filterValue = f;
        filterValuePresent = true;

        refilterFunction = f;
        refilter = xfilterFilter.filterAll;

        filterIndexFunction(f, false);

        var bounds = refilter(values);
        lo0 = bounds[0], hi0 = bounds[1];

        return dimension;
      }

      function filterIndexFunction(f, filterAll) {
        var i,
            k,
            x,
            added = [],
            removed = [],
            valueIndexAdded = [],
            valueIndexRemoved = [],
            indexLength = values.length;

        if(!iterable) {
          for (i = 0; i < indexLength; ++i) {
            if (!(filters[offset][k = index[i]] & one) ^ !!(x = f(values[i], i))) {
              if (x) added.push(k);
              else removed.push(k);
            }
          }
        }

        if(iterable) {
          for(i=0; i < indexLength; ++i) {
            if(f(values[i], i)) {
              added.push(index[i]);
              valueIndexAdded.push(i);
            } else {
              removed.push(index[i]);
              valueIndexRemoved.push(i);
            }
          }
        }

        if(!iterable) {
          for(i=0; i<added.length; i++) {
            if(filters[offset][added[i]] & one) filters[offset][added[i]] &= zero;
          }

          for(i=0; i<removed.length; i++) {
            if(!(filters[offset][removed[i]] & one)) filters[offset][removed[i]] |= one;
          }
        } else {

          var newAdded = [];
          var newRemoved = [];
          for (i = 0; i < added.length; i++) {
            // First check this particular value needs to be added
            if(iterablesIndexFilterStatus[valueIndexAdded[i]] === 1) {
              iterablesIndexCount[added[i]]++;
              iterablesIndexFilterStatus[valueIndexAdded[i]] = 0;
              if(iterablesIndexCount[added[i]] === 1) {
                filters[offset][added[i]] ^= one;
                newAdded.push(added[i]);
              }
            }
          }
          for (i = 0; i < removed.length; i++) {
            // First check this particular value needs to be removed
            if(iterablesIndexFilterStatus[valueIndexRemoved[i]] === 0) {
              iterablesIndexCount[removed[i]]--;
              iterablesIndexFilterStatus[valueIndexRemoved[i]] = 1;
              if(iterablesIndexCount[removed[i]] === 0) {
                filters[offset][removed[i]] ^= one;
                newRemoved.push(removed[i]);
              }
            }
          }

          added = newAdded;
          removed = newRemoved;

          // Now handle empty rows.
          if(filterAll) {
            for(i = 0; i < iterablesEmptyRows.length; i++) {
              if((filters[offset][k = iterablesEmptyRows[i]] & one)) {
                // Was not in the filter, so set the filter and add
                filters[offset][k] ^= one;
                added.push(k);
              }
            }
          } else {
            // filter in place - remove empty rows if necessary
            for(i = 0; i < iterablesEmptyRows.length; i++) {
              if(!(filters[offset][k = iterablesEmptyRows[i]] & one)) {
                // Was in the filter, so set the filter and remove
                filters[offset][k] ^= one;
                removed.push(k);
              }
            }
          }
        }

        filterListeners.forEach(function(l) { l(one, offset, added, removed); });
        triggerOnChange('filtered');
      }

      function currentFilter() {
        return filterValue;
      }

      function hasCurrentFilter() {
        return filterValuePresent;
      }

      // Returns the top K selected records based on this dimension's order.
      // Note: observes this dimension's filter, unlike group and groupAll.
      function top(k, top_offset) {
        var array = [],
            i = hi0,
            j,
            toSkip = 0;

        if(top_offset && top_offset > 0) toSkip = top_offset;

        while (--i >= lo0 && k > 0) {
          if (filters.zero(j = index[i])) {
            if(toSkip > 0) {
              //skip matching row
              --toSkip;
            } else {
              array.push(data[j]);
              --k;
            }
          }
        }

        if(iterable){
          for(i = 0; i < iterablesEmptyRows.length && k > 0; i++) {
            // Add row with empty iterable column at the end
            if(filters.zero(j = iterablesEmptyRows[i])) {
              if(toSkip > 0) {
                //skip matching row
                --toSkip;
              } else {
                array.push(data[j]);
                --k;
              }
            }
          }
        }

        return array;
      }

      // Returns the bottom K selected records based on this dimension's order.
      // Note: observes this dimension's filter, unlike group and groupAll.
      function bottom(k, bottom_offset) {
        var array = [],
            i,
            j,
            toSkip = 0;

        if(bottom_offset && bottom_offset > 0) toSkip = bottom_offset;

        if(iterable) {
          // Add row with empty iterable column at the top
          for(i = 0; i < iterablesEmptyRows.length && k > 0; i++) {
            if(filters.zero(j = iterablesEmptyRows[i])) {
              if(toSkip > 0) {
                //skip matching row
                --toSkip;
              } else {
                array.push(data[j]);
                --k;
              }
            }
          }
        }

        i = lo0;

        while (i < hi0 && k > 0) {
          if (filters.zero(j = index[i])) {
            if(toSkip > 0) {
              //skip matching row
              --toSkip;
            } else {
              array.push(data[j]);
              --k;
            }
          }
          i++;
        }

        return array;
      }

      // Adds a new group to this dimension, using the specified key function.
      function group(key) {
        var group = {
          top: top,
          all: all,
          reduce: reduce,
          reduceCount: reduceCount,
          reduceSum: reduceSum,
          order: order,
          orderNatural: orderNatural,
          size: size,
          dispose: dispose,
          remove: dispose // for backwards-compatibility
        };

        // Ensure that this group will be removed when the dimension is removed.
        dimensionGroups.push(group);

        var groups, // array of {key, value}
            groupIndex, // object id ↦ group id
            groupWidth = 8,
            groupCapacity = capacity(groupWidth),
            k = 0, // cardinality
            select,
            heap,
            reduceAdd,
            reduceRemove,
            reduceInitial,
            update = cr_null,
            reset = cr_null,
            resetNeeded = true,
            groupAll = key === cr_null,
            n0old;

        if (arguments.length < 1) key = cr_identity;

        // The group listens to the crossfilter for when any dimension changes, so
        // that it can update the associated reduce values. It must also listen to
        // the parent dimension for when data is added, and compute new keys.
        filterListeners.push(update);
        indexListeners.push(add);
        removeDataListeners.push(removeData);

        // Incorporate any existing data into the grouping.
        add(values, index, 0, n);

        // Incorporates the specified new values into this group.
        // This function is responsible for updating groups and groupIndex.
        function add(newValues, newIndex, n0, n1) {

          if(iterable) {
            n0old = n0;
            n0 = values.length - newValues.length;
            n1 = newValues.length;
          }

          var oldGroups = groups,
              reIndex = iterable ? [] : cr_index(k, groupCapacity),
              add = reduceAdd,
              remove = reduceRemove,
              initial = reduceInitial,
              k0 = k, // old cardinality
              i0 = 0, // index of old group
              i1 = 0, // index of new record
              j, // object id
              g0, // old group
              x0, // old key
              x1, // new key
              g, // group to add
              x; // key of group to add

          // If a reset is needed, we don't need to update the reduce values.
          if (resetNeeded) add = initial = cr_null;
          if (resetNeeded) remove = initial = cr_null;

          // Reset the new groups (k is a lower bound).
          // Also, make sure that groupIndex exists and is long enough.
          groups = new Array(k), k = 0;
          if(iterable){
            groupIndex = k0 ? groupIndex : [];
          }
          else {
            groupIndex = k0 > 1 ? xfilterArray.arrayLengthen(groupIndex, n) : cr_index(n, groupCapacity);
          }


          // Get the first old key (x0 of g0), if it exists.
          if (k0) x0 = (g0 = oldGroups[0]).key;

          // Find the first new key (x1), skipping NaN keys.
          while (i1 < n1 && !((x1 = key(newValues[i1])) >= x1)) ++i1;

          // While new keys remain…
          while (i1 < n1) {

            // Determine the lesser of the two current keys; new and old.
            // If there are no old keys remaining, then always add the new key.
            if (g0 && x0 <= x1) {
              g = g0, x = x0;

              // Record the new index of the old group.
              reIndex[i0] = k;

              // Retrieve the next old key.
              g0 = oldGroups[++i0];
              if (g0) x0 = g0.key;
            } else {
              g = {key: x1, value: initial()}, x = x1;
            }

            // Add the lesser group.
            groups[k] = g;

            // Add any selected records belonging to the added group, while
            // advancing the new key and populating the associated group index.

            while (x1 <= x) {
              j = newIndex[i1] + (iterable ? n0old : n0);


              if(iterable){
                if(groupIndex[j]){
                  groupIndex[j].push(k);
                }
                else {
                  groupIndex[j] = [k];
                }
              }
              else {
                groupIndex[j] = k;
              }

              // Always add new values to groups. Only remove when not in filter.
              // This gives groups full information on data life-cycle.
              g.value = add(g.value, data[j], true);
              if (!filters.zeroExcept(j, offset, zero)) g.value = remove(g.value, data[j], false);
              if (++i1 >= n1) break;
              x1 = key(newValues[i1]);
            }

            groupIncrement();
          }

          // Add any remaining old groups that were greater th1an all new keys.
          // No incremental reduce is needed; these groups have no new records.
          // Also record the new index of the old group.
          while (i0 < k0) {
            groups[reIndex[i0] = k] = oldGroups[i0++];
            groupIncrement();
          }


          // Fill in gaps with empty arrays where there may have been rows with empty iterables
          if(iterable){
            for (var index1 = 0; index1 < n; index1++) {
              if(!groupIndex[index1]){
                groupIndex[index1] = [];
              }
            }
          }

          // If we added any new groups before any old groups,
          // update the group index of all the old records.
          if(k > i0){
            if(iterable){
              for (i0 = 0; i0 < n0old; ++i0) {
                for (index1 = 0; index1 < groupIndex[i0].length; index1++) {
                  groupIndex[i0][index1] = reIndex[groupIndex[i0][index1]];
                }
              }
            }
            else {
              for (i0 = 0; i0 < n0; ++i0) {
                groupIndex[i0] = reIndex[groupIndex[i0]];
              }
            }
          }

          // Modify the update and reset behavior based on the cardinality.
          // If the cardinality is less than or equal to one, then the groupIndex
          // is not needed. If the cardinality is zero, then there are no records
          // and therefore no groups to update or reset. Note that we also must
          // change the registered listener to point to the new method.
          j = filterListeners.indexOf(update);
          if (k > 1 || iterable) {
            update = updateMany;
            reset = resetMany;
          } else {
            if (!k && groupAll) {
              k = 1;
              groups = [{key: null, value: initial()}];
            }
            if (k === 1) {
              update = updateOne;
              reset = resetOne;
            } else {
              update = cr_null;
              reset = cr_null;
            }
            groupIndex = null;
          }
          filterListeners[j] = update;

          // Count the number of added groups,
          // and widen the group index as needed.
          function groupIncrement() {
            if(iterable){
              k++;
              return
            }
            if (++k === groupCapacity) {
              reIndex = xfilterArray.arrayWiden(reIndex, groupWidth <<= 1);
              groupIndex = xfilterArray.arrayWiden(groupIndex, groupWidth);
              groupCapacity = capacity(groupWidth);
            }
          }
        }

        function removeData(reIndex) {
          if (k > 1 || iterable) {
            var oldK = k,
                oldGroups = groups,
                seenGroups = cr_index(oldK, oldK),
                i,
                i0,
                j;

            // Filter out non-matches by copying matching group index entries to
            // the beginning of the array.
            if (!iterable) {
              for (i = 0, j = 0; i < n; ++i) {
                if (reIndex[i] !== REMOVED_INDEX) {
                  seenGroups[groupIndex[j] = groupIndex[i]] = 1;
                  ++j;
                }
              }
            } else {
              for (i = 0, j = 0; i < n; ++i) {
                if (reIndex[i] !== REMOVED_INDEX) {
                  groupIndex[j] = groupIndex[i];
                  for (i0 = 0; i0 < groupIndex[j].length; i0++) {
                    seenGroups[groupIndex[j][i0]] = 1;
                  }
                  ++j;
                }
              }
              groupIndex = groupIndex.slice(0, j);
            }

            // Reassemble groups including only those groups that were referred
            // to by matching group index entries.  Note the new group index in
            // seenGroups.
            groups = [], k = 0;
            for (i = 0; i < oldK; ++i) {
              if (seenGroups[i]) {
                seenGroups[i] = k++;
                groups.push(oldGroups[i]);
              }
            }

            if (k > 1 || iterable) {
              // Reindex the group index using seenGroups to find the new index.
              if (!iterable) {
                for (i = 0; i < j; ++i) groupIndex[i] = seenGroups[groupIndex[i]];
              } else {
                for (i = 0; i < j; ++i) {
                  for (i0 = 0; i0 < groupIndex[i].length; ++i0) {
                    groupIndex[i][i0] = seenGroups[groupIndex[i][i0]];
                  }
                }
              }
            } else {
              groupIndex = null;
            }
            filterListeners[filterListeners.indexOf(update)] = k > 1 || iterable
                ? (reset = resetMany, update = updateMany)
                : k === 1 ? (reset = resetOne, update = updateOne)
                : reset = update = cr_null;
          } else if (k === 1) {
            if (groupAll) return;
            for (var index3 = 0; index3 < n; ++index3) if (reIndex[index3] !== REMOVED_INDEX) return;
            groups = [], k = 0;
            filterListeners[filterListeners.indexOf(update)] =
            update = reset = cr_null;
          }
        }

        // Reduces the specified selected or deselected records.
        // This function is only used when the cardinality is greater than 1.
        // notFilter indicates a crossfilter.add/remove operation.
        function updateMany(filterOne, filterOffset, added, removed, notFilter) {

          if ((filterOne === one && filterOffset === offset) || resetNeeded) return;

          var i,
              j,
              k,
              n,
              g;

          if(iterable){
            // Add the added values.
            for (i = 0, n = added.length; i < n; ++i) {
              if (filters.zeroExcept(k = added[i], offset, zero)) {
                for (j = 0; j < groupIndex[k].length; j++) {
                  g = groups[groupIndex[k][j]];
                  g.value = reduceAdd(g.value, data[k], false, j);
                }
              }
            }

            // Remove the removed values.
            for (i = 0, n = removed.length; i < n; ++i) {
              if (filters.onlyExcept(k = removed[i], offset, zero, filterOffset, filterOne)) {
                for (j = 0; j < groupIndex[k].length; j++) {
                  g = groups[groupIndex[k][j]];
                  g.value = reduceRemove(g.value, data[k], notFilter, j);
                }
              }
            }
            return;
          }

          // Add the added values.
          for (i = 0, n = added.length; i < n; ++i) {
            if (filters.zeroExcept(k = added[i], offset, zero)) {
              g = groups[groupIndex[k]];
              g.value = reduceAdd(g.value, data[k], false);
            }
          }

          // Remove the removed values.
          for (i = 0, n = removed.length; i < n; ++i) {
            if (filters.onlyExcept(k = removed[i], offset, zero, filterOffset, filterOne)) {
              g = groups[groupIndex[k]];
              g.value = reduceRemove(g.value, data[k], notFilter);
            }
          }
        }

        // Reduces the specified selected or deselected records.
        // This function is only used when the cardinality is 1.
        // notFilter indicates a crossfilter.add/remove operation.
        function updateOne(filterOne, filterOffset, added, removed, notFilter) {
          if ((filterOne === one && filterOffset === offset) || resetNeeded) return;

          var i,
              k,
              n,
              g = groups[0];

          // Add the added values.
          for (i = 0, n = added.length; i < n; ++i) {
            if (filters.zeroExcept(k = added[i], offset, zero)) {
              g.value = reduceAdd(g.value, data[k], false);
            }
          }

          // Remove the removed values.
          for (i = 0, n = removed.length; i < n; ++i) {
            if (filters.onlyExcept(k = removed[i], offset, zero, filterOffset, filterOne)) {
              g.value = reduceRemove(g.value, data[k], notFilter);
            }
          }
        }

        // Recomputes the group reduce values from scratch.
        // This function is only used when the cardinality is greater than 1.
        function resetMany() {
          var i,
              j,
              g;

          // Reset all group values.
          for (i = 0; i < k; ++i) {
            groups[i].value = reduceInitial();
          }

          // We add all records and then remove filtered records so that reducers
          // can build an 'unfiltered' view even if there are already filters in
          // place on other dimensions.
          if(iterable){
            for (i = 0; i < n; ++i) {
              for (j = 0; j < groupIndex[i].length; j++) {
                g = groups[groupIndex[i][j]];
                g.value = reduceAdd(g.value, data[i], true, j);
              }
            }
            for (i = 0; i < n; ++i) {
              if (!filters.zeroExcept(i, offset, zero)) {
                for (j = 0; j < groupIndex[i].length; j++) {
                  g = groups[groupIndex[i][j]];
                  g.value = reduceRemove(g.value, data[i], false, j);
                }
              }
            }
            return;
          }

          for (i = 0; i < n; ++i) {
            g = groups[groupIndex[i]];
            g.value = reduceAdd(g.value, data[i], true);
          }
          for (i = 0; i < n; ++i) {
            if (!filters.zeroExcept(i, offset, zero)) {
              g = groups[groupIndex[i]];
              g.value = reduceRemove(g.value, data[i], false);
            }
          }
        }

        // Recomputes the group reduce values from scratch.
        // This function is only used when the cardinality is 1.
        function resetOne() {
          var i,
              g = groups[0];

          // Reset the singleton group values.
          g.value = reduceInitial();

          // We add all records and then remove filtered records so that reducers
          // can build an 'unfiltered' view even if there are already filters in
          // place on other dimensions.
          for (i = 0; i < n; ++i) {
            g.value = reduceAdd(g.value, data[i], true);
          }

          for (i = 0; i < n; ++i) {
            if (!filters.zeroExcept(i, offset, zero)) {
              g.value = reduceRemove(g.value, data[i], false);
            }
          }
        }

        // Returns the array of group values, in the dimension's natural order.
        function all() {
          if (resetNeeded) reset(), resetNeeded = false;
          return groups;
        }

        // Returns a new array containing the top K group values, in reduce order.
        function top(k) {
          var top = select(all(), 0, groups.length, k);
          return heap.sort(top, 0, top.length);
        }

        // Sets the reduce behavior for this group to use the specified functions.
        // This method lazily recomputes the reduce values, waiting until needed.
        function reduce(add, remove, initial) {
          reduceAdd = add;
          reduceRemove = remove;
          reduceInitial = initial;
          resetNeeded = true;
          return group;
        }

        // A convenience method for reducing by count.
        function reduceCount() {
          return reduce(xfilterReduce.reduceIncrement, xfilterReduce.reduceDecrement, cr_zero);
        }

        // A convenience method for reducing by sum(value).
        function reduceSum(value) {
          return reduce(xfilterReduce.reduceAdd(value), xfilterReduce.reduceSubtract(value), cr_zero);
        }

        // Sets the reduce order, using the specified accessor.
        function order(value) {
          select = h.by(valueOf);
          heap = h$1.by(valueOf);
          function valueOf(d) { return value(d.value); }
          return group;
        }

        // A convenience method for natural ordering by reduce value.
        function orderNatural() {
          return order(cr_identity);
        }

        // Returns the cardinality of this group, irrespective of any filters.
        function size() {
          return k;
        }

        // Removes this group and associated event listeners.
        function dispose() {
          var i = filterListeners.indexOf(update);
          if (i >= 0) filterListeners.splice(i, 1);
          i = indexListeners.indexOf(add);
          if (i >= 0) indexListeners.splice(i, 1);
          i = removeDataListeners.indexOf(removeData);
          if (i >= 0) removeDataListeners.splice(i, 1);
          i = dimensionGroups.indexOf(group);
          if (i >= 0) dimensionGroups.splice(i, 1);
          return group;
        }

        return reduceCount().orderNatural();
      }

      // A convenience function for generating a singleton group.
      function groupAll() {
        var g = group(cr_null), all = g.all;
        delete g.all;
        delete g.top;
        delete g.order;
        delete g.orderNatural;
        delete g.size;
        g.value = function() { return all()[0].value; };
        return g;
      }

      // Removes this dimension and associated groups and event listeners.
      function dispose() {
        dimensionGroups.forEach(function(group) { group.dispose(); });
        var i = dataListeners.indexOf(preAdd);
        if (i >= 0) dataListeners.splice(i, 1);
        i = dataListeners.indexOf(postAdd);
        if (i >= 0) dataListeners.splice(i, 1);
        i = removeDataListeners.indexOf(removeData);
        if (i >= 0) removeDataListeners.splice(i, 1);
        filters.masks[offset] &= zero;
        return filterAll();
      }

      return dimension;
    }

    // A convenience method for groupAll on a dummy dimension.
    // This implementation can be optimized since it always has cardinality 1.
    function groupAll() {
      var group = {
        reduce: reduce,
        reduceCount: reduceCount,
        reduceSum: reduceSum,
        value: value,
        dispose: dispose,
        remove: dispose // for backwards-compatibility
      };

      var reduceValue,
          reduceAdd,
          reduceRemove,
          reduceInitial,
          resetNeeded = true;

      // The group listens to the crossfilter for when any dimension changes, so
      // that it can update the reduce value. It must also listen to the parent
      // dimension for when data is added.
      filterListeners.push(update);
      dataListeners.push(add);

      // For consistency; actually a no-op since resetNeeded is true.
      add(data, 0);

      // Incorporates the specified new values into this group.
      function add(newData, n0) {
        var i;

        if (resetNeeded) return;

        // Cycle through all the values.
        for (i = n0; i < n; ++i) {

          // Add all values all the time.
          reduceValue = reduceAdd(reduceValue, data[i], true);

          // Remove the value if filtered.
          if (!filters.zero(i)) {
            reduceValue = reduceRemove(reduceValue, data[i], false);
          }
        }
      }

      // Reduces the specified selected or deselected records.
      function update(filterOne, filterOffset, added, removed, notFilter) {
        var i,
            k,
            n;

        if (resetNeeded) return;

        // Add the added values.
        for (i = 0, n = added.length; i < n; ++i) {
          if (filters.zero(k = added[i])) {
            reduceValue = reduceAdd(reduceValue, data[k], notFilter);
          }
        }

        // Remove the removed values.
        for (i = 0, n = removed.length; i < n; ++i) {
          if (filters.only(k = removed[i], filterOffset, filterOne)) {
            reduceValue = reduceRemove(reduceValue, data[k], notFilter);
          }
        }
      }

      // Recomputes the group reduce value from scratch.
      function reset() {
        var i;

        reduceValue = reduceInitial();

        // Cycle through all the values.
        for (i = 0; i < n; ++i) {

          // Add all values all the time.
          reduceValue = reduceAdd(reduceValue, data[i], true);

          // Remove the value if it is filtered.
          if (!filters.zero(i)) {
            reduceValue = reduceRemove(reduceValue, data[i], false);
          }
        }
      }

      // Sets the reduce behavior for this group to use the specified functions.
      // This method lazily recomputes the reduce value, waiting until needed.
      function reduce(add, remove, initial) {
        reduceAdd = add;
        reduceRemove = remove;
        reduceInitial = initial;
        resetNeeded = true;
        return group;
      }

      // A convenience method for reducing by count.
      function reduceCount() {
        return reduce(xfilterReduce.reduceIncrement, xfilterReduce.reduceDecrement, cr_zero);
      }

      // A convenience method for reducing by sum(value).
      function reduceSum(value) {
        return reduce(xfilterReduce.reduceAdd(value), xfilterReduce.reduceSubtract(value), cr_zero);
      }

      // Returns the computed reduce value.
      function value() {
        if (resetNeeded) reset(), resetNeeded = false;
        return reduceValue;
      }

      // Removes this group and associated event listeners.
      function dispose() {
        var i = filterListeners.indexOf(update);
        if (i >= 0) filterListeners.splice(i, 1);
        i = dataListeners.indexOf(add);
        if (i >= 0) dataListeners.splice(i, 1);
        return group;
      }

      return reduceCount();
    }

    // Returns the number of records in this crossfilter, irrespective of any filters.
    function size() {
      return n;
    }

    // Returns the raw row data contained in this crossfilter
    function all(){
      return data;
    }

    // Returns row data with all dimension filters applied, except for filters in ignore_dimensions
    function allFiltered(ignore_dimensions) {
      var array = [],
          i = 0,
          mask = maskForDimensions(ignore_dimensions || []);

        for (i = 0; i < n; i++) {
          if (filters.zeroExceptMask(i, mask)) {
            array.push(data[i]);
          }
        }

        return array;
    }

    function onChange(cb){
      if(typeof cb !== 'function'){
        /* eslint no-console: 0 */
        console.warn('onChange callback parameter must be a function!');
        return;
      }
      callbacks.push(cb);
      return function(){
        callbacks.splice(callbacks.indexOf(cb), 1);
      };
    }

    function triggerOnChange(eventName){
      for (var i = 0; i < callbacks.length; i++) {
        callbacks[i](eventName);
      }
    }

    return arguments.length
        ? add(arguments[0])
        : crossfilter;
  }

  // Returns an array of size n, big enough to store ids up to m.
  function cr_index(n, m) {
    return (m < 0x101
        ? xfilterArray.array8 : m < 0x10001
        ? xfilterArray.array16
        : xfilterArray.array32)(n);
  }

  // Constructs a new array of size n, with sequential values from 0 to n - 1.
  function cr_range(n) {
    var range = cr_index(n, n);
    for (var i = -1; ++i < n;) range[i] = i;
    return range;
  }

  function capacity(w) {
    return w === 8
        ? 0x100 : w === 16
        ? 0x10000
        : 0x100000000;
  }

  function html2element(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim(); // Never return a text node of whitespace as the result

    return template.content.firstChild;
  } // html2element

  function svg2element(svg) {
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.innerHTML = svg.trim();
    return g.firstChild;
  } // svg2element

  function calculateExponent(val) {
    // calculate the exponent for the scientific notation.
    var exp = 0;

    while (Math.floor(Math.abs(val) / Math.pow(10, exp + 1)) > 0) {
      exp += 1;
    } // Convert the exponent to multiple of three


    return Math.floor(exp / 3) * 3;
  } // 
  // From regular helpers.

  function unique(d) {
    // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    } // unique


    return d.filter(onlyUnique);
  } // unique

  var ScaleLinear = /*#__PURE__*/function () {
    function ScaleLinear() {
      _classCallCheck(this, ScaleLinear);

      this.range = [0, 1];
      this.domain = [0, 1];
    } // constructor


    _createClass(ScaleLinear, [{
      key: "val2px",
      value: function val2px(v) {
        var obj = this;
        return (v - obj.domain[0]) / (obj.domain[1] - obj.domain[0]) * (obj.range[1] - obj.range[0]) + obj.range[0];
      } // val2px

    }, {
      key: "px2val",
      value: function px2val(v) {
        var obj = this;
        return (v - obj.range[0]) / (obj.range[1] - obj.range[0]) * (obj.domain[1] - obj.domain[0]) + obj.domain[0];
      } // val2px

    }]);

    return ScaleLinear;
  }(); // ScaleLinear

  var ObservableVariable = /*#__PURE__*/function () {
    function ObservableVariable(initialvalue) {
      _classCallCheck(this, ObservableVariable);

      this._value = undefined;
      this.subscribers = [];
      var obj = this;
      obj._value = initialvalue;
    } // constructor


    _createClass(ObservableVariable, [{
      key: "value",
      get: // set value
      function get() {
        return this._value;
      } // get value
      ,
      set: function set(v) {
        var obj = this;
        obj._value = v;
        obj.update();
      }
    }, {
      key: "subscribe",
      value: function subscribe(f) {
        var obj = this;
        obj.subscribers.push(f);
      } // subscribe

    }, {
      key: "update",
      value: function update() {
        var obj = this;
        obj.subscribers.forEach(function (f) {
          f();
        }); // forEach
      } // update

    }]);

    return ObservableVariable;
  }(); // ObservableVariable

  var dataStorage = /*#__PURE__*/function () {
    // Filtering
    // Highlighting
    // Detail plot accessors.
    // Plots need to be held by the data, because in the case a plot variable is changed the relevant filter needs to be removed.
    function dataStorage() {
      _classCallCheck(this, dataStorage);

      this.tasks = [];
      this.filters = {};
      this.subset = new ObservableVariable([]);
      this.currentlocked = false;
      this.current = undefined;
      this.datum = undefined;
      this.distributions = [{
        name: "mach",
        extent: [],
        accessor: function accessor(d) {
          return d.distribution["mach"];
        }
      }, {
        name: "camber",
        extent: [],
        accessor: function accessor(d) {
          return d.distribution["camber"];
        }
      }, {
        name: "theta",
        extent: [],
        accessor: function accessor(d) {
          return d.distribution["theta"];
        }
      }];
      this.contours = [{
        name: "mach",
        extent: [],
        accessor: function accessor(d) {
          return d.contour["mach"];
        }
      }];
      this.plots = [];
      var obj = this; // Initiate a crossfilter object.

      obj.crossfilter = crossfilter(); // And initiate a general dimension. Does this one get trimmed immediately?

      obj.taskdim = obj.crossfilter.dimension(function (d) {
        return d.taskId;
      });
    } // constructor
    // Function that allows plots to trigger general updates.


    _createClass(dataStorage, [{
      key: "repaint",
      value: function repaint() {
        var obj = this;
        obj.plots.forEach(function (p) {
          p.repaint();
        }); // forEach
      } // repaint

      /* FILTERING
         What should happen when the plot sets a dimension, but then the user navigates away. Should the selection persist, or should that filter be removed? I think removed. But this means that dataStorage must listen to variable changes. Maybe that's the simplest way - just monitor active dimensions all the time.
      */

    }, {
      key: "filtertrim",
      value: function filtertrim() {
        // Check which filtering dimensions are still valid.
        var obj = this; // Check which filters are still active. This should be only for plots that support filtering though...

        var plotvariables = obj.plots.reduce(function (acc, p) {
          // The icon plot does not have variables on axes, therefore no svgobj.
          if (p.svgobj) {
            var xname = p.svgobj.x.variable.name;
            var yname = p.svgobj.y.variable.name;
            acc = acc.concat([xname, yname].filter(function (n) {
              return n;
            }));
          } // if


          return acc;
        }, []); // reduce

        var admissiblefiltervariables = unique(plotvariables); // Now go through the dimensions and delete anz dimensions that are no longer needed. These are dimensions that do not appear as plot variables.

        for (var dimensionname in obj.filters) {
          if (!admissiblefiltervariables.includes(dimensionname)) {
            obj.filters[dimensionname].dim.filterAll();
            delete obj.filters[dimensionname];
          } // if

        } // for


        obj.filterupdate();
      } // filtertrim

    }, {
      key: "filterapply",
      value: function filterapply(variablename, interval) {
        var obj = this; // In some cases this function can be called with an undefined variablename, but a defined interval.
        // Loop through the filters and either create additional dimensions, or set the desired interval range to existing dimensions.

        if (variablename && !obj.filters[variablename]) {
          // The range is required so that plots can access the data required to update their brushes.
          filterset = {
            range: interval,
            dim: obj.crossfilter.dimension(function (d) {
              return d.metadata[variablename];
            })
          };
          obj.filters[variablename] = filterset;
        } // if
        // Now if the correct filterset is defined apply hte filter.


        var filterset = obj.filters[variablename];

        if (filterset) {
          filterset.range = interval;
          filterset.dim.filter(function (d) {
            return d >= interval[0] && d <= interval[1];
          }); // filter

          obj.filterupdate();
        } // if

      } // filterapply

    }, {
      key: "filterremove",
      value: function filterremove(variablename) {
        var obj = this;
        var filterset = obj.filters[variablename];

        if (filterset) {
          filterset.range = [0, 0];
          filterset.dim.filterAll();
          obj.filterupdate();
        } // if

      } // filterremove

    }, {
      key: "filterupdate",
      value: function filterupdate() {
        // Pre-save a crossfilter query.
        var obj = this;
        obj.subset.value = obj.taskdim.top(Infinity);
      } // filterupdate
      // DATA IMPORT

    }, {
      key: "replace",
      value: function replace(tasks) {
        var obj = this;
        obj.tasks = reformatTasks(tasks);
        obj.crossfilter.remove();
        obj.crossfilter.add(obj.tasks); // The actual distribution data is created for individual task objects, and the `distributions' property are helpers for the plots - they are given to the plots to specify which distribution they should use.

        obj.updateextent();
      } // replace

    }, {
      key: "add",
      value: function add(tasks) {
        // Instead of replacing the data, merge the previous and the old data.
        var obj = this;
        var existingtasks = obj.tasks;
        var newtasks = reformatTasks(tasks);
        obj.tasks = existingtasks.concat(newtasks);
        obj.crossfilter.add(newtasks);
        obj.updatevariablenames();
        obj.updateextent();
      } // add

    }, {
      key: "updatevariablenames",
      value: function updatevariablenames() {
        // The variables objects cannot be created here! The variables objects NEED (!) to be created in the plots themselves, as the axis extents, and the variable extents by extension, need to be updated for each plot separately. But the available variablenames can be determined here.
        var obj = this;

        if (obj.tasks) {
          // `dr' and `name' are the only allowed strings. dr is the filepath to the original data on Demetrios' machine.
          obj.variablenames = Object.keys(obj.tasks[0].metadata).filter(function (name) {
            return !["dr", "name"].includes(name);
          });
        } else {
          obj.variablenames = [];
        } // if

      } // updatevariablenames

    }, {
      key: "updateextent",
      value: function updateextent() {
        // After new data is added the extent has to be corrected.
        var obj = this; // Calculate the extents here

        obj.distributions.forEach(function (series) {
          var ex = extent$1(obj.tasks, function (t) {
            return t.distribution[series.name];
          });
          series.extent = ex;
        }); // forEach

        obj.contours.forEach(function (contour) {
          var ex = extentContour(obj.tasks, function (t) {
            return t.contour[contour.name];
          });
          contour.extent = ex;
        });
      } // updateextent

    }, {
      key: "selecttask",
      value: function selecttask(task) {
        // The user may wish to have two datum designs chosen at any time. If two datums are chosen, then the highlighting should not be active. More than two datums are not allowed because the names need to fit in the header.
        var obj = this;

        if (obj.datum) {
          // Datum currently defined. Task could be datum clicked again, or another task.
          if (obj.datum == task) {
            // Datum clicked again. Clear everything.
            obj.currentlocked = false;
            obj.current = undefined;
            obj.datum = undefined;
          } else {
            // Datum defined, but a different task has been clicked. If the task is the same as current, then just unlock the current. If it is a different task, then replace current.
            if (obj.current == task) {
              // Toggle the selection.
              obj.currentlocked = !obj.currentlocked;
              obj.current = obj.currentlocked ? task : undefined;
            } else {
              // New task selected as current.
              obj.currentlocked = true;
              obj.current = task;
            } // if

          } // if

        } else {
          // Datum not currently defined. Select this task as datum.
          obj.datum = task;
          obj.currentlocked = false;
        } // if

      } // selecttask

    }, {
      key: "setcurrent",
      value: function setcurrent(task) {
        var obj = this;
        obj.current = obj.currentlocked ? obj.current : task;
      } // togglecurrent

    }]);

    return dataStorage;
  }(); // dataStorage

  function reformatTasks(tasks) {
    tasks = reformatDistributionData(tasks);
    tasks = reformatContourData(tasks);
    return tasks;
  } // reformatTasks


  function reformatDistributionData(tasks) {
    tasks.forEach(function (t) {
      // Mach distributon
      var mach1 = t.distribution.Mis_1.map(function (v, i) {
        return [t.distribution.s_1[i], t.distribution.Mis_1[i]];
      });
      var mach2 = t.distribution.Mis_2.map(function (v, i) {
        return [t.distribution.s_2[i], t.distribution.Mis_2[i]];
      });
      var mach = mach1.concat(mach2.reverse()); // Camber distributions

      var camber = t.camber.camber.map(function (v, i) {
        return [t.camber.s_cam[i], t.camber.camber[i]];
      }); // map
      // Theta distributions.

      var theta1 = t.camber.theta_ps.map(function (v, i) {
        return [t.camber.s_ps[i], t.camber.theta_ps[i]];
      }); // map

      var theta2 = t.camber.theta_ss.map(function (v, i) {
        return [t.camber.s_ss[i], t.camber.theta_ss[i]];
      }); // map

      var theta = theta1.concat(theta2.reverse()); // Create the series that can be plotted

      t.distribution = {
        mach: {
          level: t.metadata.name[0],
          points: mach,
          color: "cornflowerblue"
        },
        camber: {
          level: t.metadata.name[0],
          points: camber,
          color: "cornflowerblue"
        },
        theta: {
          level: t.metadata.name[0],
          points: theta,
          color: "cornflowerblue"
        }
      }; // distribution
    }); // forEach

    return tasks;
  } // reformatDistributionData


  function reformatContourData(tasks) {
    tasks.forEach(function (t) {
      var passage0 = matlabContour2drawLines(t.contour.C);
      var passage1 = matlabContour2drawLines(t.contour.C_pitch);
      var flow_lines = passage0.concat(passage1);
      flow_lines.forEach(function (line) {
        line.color = "cornflowerblue";
      });
      flow_lines.filter(function (line) {
        return line.level == 1;
      }).forEach(function (line) {
        // line.color = "seagreen";
        line.lineWidth = 2;
      });
      var custom_lines = [{
        level: "aerofoil",
        points: t.contour.xrt,
        color: "black"
      }, {
        level: "aerofoil",
        points: t.contour.xrt_neg_pitch,
        color: "black"
      }, {
        level: "aerofoil",
        points: t.contour.xrt_pos_pitch,
        color: "black"
      }, {
        level: "throat_bl",
        points: t.contour.xrt_throat_bl,
        color: "magenta"
      }, {
        level: "stag_line",
        points: t.contour.xrt_stag_line,
        color: "gray"
      }, {
        level: "bl",
        points: t.contour.bl,
        color: "gray"
      }]; // calculate the extents

      t.contour = {
        mach: flow_lines.concat(custom_lines)
      };
    }); // forEach

    return tasks;
  } // reformatContourData


  function extentContour(tasks, accessor) {
    var x_extent = [Math.POSITIVE_INFINITY, Math.NEGATIVE_INFINITY];
    var y_extent = [Math.POSITIVE_INFINITY, Math.NEGATIVE_INFINITY];
    tasks.forEach(function (t) {
      // calculate the extents
      var c = accessor(t);
      c.forEach(function (line) {
        line.points.forEach(function (p) {
          x_extent[0] = x_extent[0] < p[0] ? x_extent[0] : p[0];
          x_extent[1] = x_extent[1] > p[0] ? x_extent[1] : p[0];
          y_extent[0] = y_extent[0] < p[1] ? y_extent[0] : p[1];
          y_extent[1] = y_extent[1] > p[1] ? y_extent[1] : p[1];
        }); // forEach
      }); // forEach
    }); // forEach
    // Control the plot aspect ratio by controlling the extents. Always try to keep hte data in the middle.
    // Try to scale the plot to fit the aspect ratio??

    var y_range = y_extent[1] - y_extent[0];
    var x_range = x_extent[1] - x_extent[0];

    if (x_range > y_range) {
      // Readjust y_extent.
      y_extent = [y_extent[0] + y_range / 2 - x_range / 2, y_extent[0] + y_range / 2 + x_range / 2];
    } else {
      x_extent = [x_extent[0] + x_range / 2 - y_range / 2, x_extent[0] + x_range / 2 + y_range / 2];
    } // if

    /*
    return {
    	x: x_extent,
    	y: y_extent
    }
    */
    // As per Demetrios' specific request, the data extent is modified here to achieve a zoomed in initial state.


    var z = 1.75; // hand picked value.

    var xc = (x_extent[0] + x_extent[1]) / 2;
    var yc = (y_extent[0] + y_extent[1]) / 2;
    var dx = (x_extent[1] - x_extent[0]) / (2 * z);
    var dy = (y_extent[1] - y_extent[0]) / (2 * z);
    return {
      x: [xc - dx, xc + dx],
      y: [yc - dy, yc + dy]
    };
  } // extentContour


  function extent$1(tasks, accessor) {
    var x_extent = [Math.POSITIVE_INFINITY, Math.NEGATIVE_INFINITY];
    var y_extent = [Math.POSITIVE_INFINITY, Math.NEGATIVE_INFINITY];
    tasks.forEach(function (t) {
      accessor(t).points.forEach(function (p) {
        x_extent[0] = x_extent[0] < p[0] ? x_extent[0] : p[0];
        x_extent[1] = x_extent[1] > p[0] ? x_extent[1] : p[0];
        y_extent[0] = y_extent[0] < p[1] ? y_extent[0] : p[1];
        y_extent[1] = y_extent[1] > p[1] ? y_extent[1] : p[1];
      }); // forEach
    }); // forEach

    return {
      x: x_extent,
      y: y_extent
    };
  } // extent


  function matlabContour2drawLines(C) {
    var lines = []; // {level: <scalar>, points: [...]}
    // Loop over all the columns, and decode accordingly.

    var currentline;
    var current_n = 0;

    for (var i = 0; i < C[0].length; i++) {
      if (current_n == 0) {
        // All hte points for this level have been collected. Start new line.
        currentline = {
          level: C[0][i],
          points: []
        };
        current_n = C[1][i];
        lines.push(currentline);
      } else {
        // Add the current point to the current line
        currentline.points.push([C[0][i], C[1][i]]);
        current_n -= 1;
      } // if

    } // for


    return lines;
  } // matlabContour2drawLines

  var templateButton = "<button class=\"breadcrumb\"></button>";
  var templateFolder = "<div class=\"collapsible\"></div>"; // The buttons are coordinated because all the frames are part of a 'folder' form.

  var CollapsibleFrame = /*#__PURE__*/function () {
    function CollapsibleFrame(name) {
      _classCallCheck(this, CollapsibleFrame);

      this.active = false;
      var obj = this;
      obj.button = html2element(templateButton);
      obj.folder = html2element(templateFolder); // Keep name to allow construction of labels later on.

      obj.name = name;
      obj.label();
    } // constructor


    _createClass(CollapsibleFrame, [{
      key: "update",
      value: function update(active) {
        var obj = this;

        if (active) {
          obj.button.classList.add("breadcrumb-active");
          obj.folder.style.maxHeight = obj.folder.scrollHeight + "px";
          obj.folder.style.paddingBottom = 30 + "px";
        } else {
          obj.button.classList.remove("breadcrumb-active");
          obj.folder.style.maxHeight = null;
          obj.folder.style.paddingBottom = 0 + "px";
        } // if


        obj.active = active;
      } // update

    }, {
      key: "label",
      value: function label(v) {
        // Update the variable part of the label.
        var obj = this;
        obj.button.innerText = "".concat(obj.name, " ").concat(v ? v : "");
      } // label

    }], [{
      key: "AddStyle",
      value: function AddStyle() {
        // This adds another css link to the header so that the elements get styled correctly. Perhaps it would be cleaner to do it in a more opaque way?
        var el = document.createElement("link");
        el.setAttribute("rel", "stylesheet");
        el.setAttribute("type", "text/css");
        el.setAttribute("href", "./code/src/support/CollapsibleFrame.css");
        document.head.appendChild(el);
      } // AddStyle

    }]);

    return CollapsibleFrame;
  }(); // CollapsibleFrame

  function ascending$1(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function bisector(f) {
    let delta = f;
    let compare = f;

    if (f.length === 1) {
      delta = (d, x) => f(d) - x;
      compare = ascendingComparator(f);
    }

    function left(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    }

    function right(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }

    function center(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      const i = left(a, x, lo, hi - 1);
      return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
    }

    return {left, center, right};
  }

  function ascendingComparator(f) {
    return (d, x) => ascending$1(f(d), x);
  }

  function number$2(x) {
    return x === null ? NaN : +x;
  }

  const ascendingBisect = bisector(ascending$1);
  const bisectRight = ascendingBisect.right;
  bisector(number$2).center;

  function count(values, valueof) {
    let count = 0;
    if (valueof === undefined) {
      for (let value of values) {
        if (value != null && (value = +value) >= value) {
          ++count;
        }
      }
    } else {
      let index = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
          ++count;
        }
      }
    }
    return count;
  }

  function extent(values, valueof) {
    let min;
    let max;
    if (valueof === undefined) {
      for (const value of values) {
        if (value != null) {
          if (min === undefined) {
            if (value >= value) min = max = value;
          } else {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    } else {
      let index = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null) {
          if (min === undefined) {
            if (value >= value) min = max = value;
          } else {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
    return [min, max];
  }

  function identity$5(x) {
    return x;
  }

  var array$1 = Array.prototype;

  var slice$1 = array$1.slice;

  function constant$3(x) {
    return function() {
      return x;
    };
  }

  var e10 = Math.sqrt(50),
      e5 = Math.sqrt(10),
      e2 = Math.sqrt(2);

  function ticks(start, stop, count) {
    var reverse,
        i = -1,
        n,
        ticks,
        step;

    stop = +stop, start = +start, count = +count;
    if (start === stop && count > 0) return [start];
    if (reverse = stop < start) n = start, start = stop, stop = n;
    if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

    if (step > 0) {
      let r0 = Math.round(start / step), r1 = Math.round(stop / step);
      if (r0 * step < start) ++r0;
      if (r1 * step > stop) --r1;
      ticks = new Array(n = r1 - r0 + 1);
      while (++i < n) ticks[i] = (r0 + i) * step;
    } else {
      step = -step;
      let r0 = Math.round(start * step), r1 = Math.round(stop * step);
      if (r0 / step < start) ++r0;
      if (r1 / step > stop) --r1;
      ticks = new Array(n = r1 - r0 + 1);
      while (++i < n) ticks[i] = (r0 + i) / step;
    }

    if (reverse) ticks.reverse();

    return ticks;
  }

  function tickIncrement(start, stop, count) {
    var step = (stop - start) / Math.max(0, count),
        power = Math.floor(Math.log(step) / Math.LN10),
        error = step / Math.pow(10, power);
    return power >= 0
        ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
        : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
  }

  function tickStep(start, stop, count) {
    var step0 = Math.abs(stop - start) / Math.max(0, count),
        step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
        error = step0 / step1;
    if (error >= e10) step1 *= 10;
    else if (error >= e5) step1 *= 5;
    else if (error >= e2) step1 *= 2;
    return stop < start ? -step1 : step1;
  }

  function nice$1(start, stop, count) {
    let prestep;
    while (true) {
      const step = tickIncrement(start, stop, count);
      if (step === prestep || step === 0 || !isFinite(step)) {
        return [start, stop];
      } else if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      }
      prestep = step;
    }
  }

  function thresholdSturges(values) {
    return Math.ceil(Math.log(count(values)) / Math.LN2) + 1;
  }

  function bin() {
    var value = identity$5,
        domain = extent,
        threshold = thresholdSturges;

    function histogram(data) {
      if (!Array.isArray(data)) data = Array.from(data);

      var i,
          n = data.length,
          x,
          values = new Array(n);

      for (i = 0; i < n; ++i) {
        values[i] = value(data[i], i, data);
      }

      var xz = domain(values),
          x0 = xz[0],
          x1 = xz[1],
          tz = threshold(values, x0, x1);

      // Convert number of thresholds into uniform thresholds, and nice the
      // default domain accordingly.
      if (!Array.isArray(tz)) {
        const max = x1, tn = +tz;
        if (domain === extent) [x0, x1] = nice$1(x0, x1, tn);
        tz = ticks(x0, x1, tn);

        // If the last threshold is coincident with the domain’s upper bound, the
        // last bin will be zero-width. If the default domain is used, and this
        // last threshold is coincident with the maximum input value, we can
        // extend the niced upper bound by one tick to ensure uniform bin widths;
        // otherwise, we simply remove the last threshold. Note that we don’t
        // coerce values or the domain to numbers, and thus must be careful to
        // compare order (>=) rather than strict equality (===)!
        if (tz[tz.length - 1] >= x1) {
          if (max >= x1 && domain === extent) {
            const step = tickIncrement(x0, x1, tn);
            if (isFinite(step)) {
              if (step > 0) {
                x1 = (Math.floor(x1 / step) + 1) * step;
              } else if (step < 0) {
                x1 = (Math.ceil(x1 * -step) + 1) / -step;
              }
            }
          } else {
            tz.pop();
          }
        }
      }

      // Remove any thresholds outside the domain.
      var m = tz.length;
      while (tz[0] <= x0) tz.shift(), --m;
      while (tz[m - 1] > x1) tz.pop(), --m;

      var bins = new Array(m + 1),
          bin;

      // Initialize bins.
      for (i = 0; i <= m; ++i) {
        bin = bins[i] = [];
        bin.x0 = i > 0 ? tz[i - 1] : x0;
        bin.x1 = i < m ? tz[i] : x1;
      }

      // Assign data to bins by value, ignoring any outside the domain.
      for (i = 0; i < n; ++i) {
        x = values[i];
        if (x0 <= x && x <= x1) {
          bins[bisectRight(tz, x, 0, m)].push(data[i]);
        }
      }

      return bins;
    }

    histogram.value = function(_) {
      return arguments.length ? (value = typeof _ === "function" ? _ : constant$3(_), histogram) : value;
    };

    histogram.domain = function(_) {
      return arguments.length ? (domain = typeof _ === "function" ? _ : constant$3([_[0], _[1]]), histogram) : domain;
    };

    histogram.thresholds = function(_) {
      return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant$3(slice$1.call(_)) : constant$3(_), histogram) : threshold;
    };

    return histogram;
  }

  function max(values, valueof) {
    let max;
    if (valueof === undefined) {
      for (const value of values) {
        if (value != null
            && (max < value || (max === undefined && value >= value))) {
          max = value;
        }
      }
    } else {
      let index = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null
            && (max < value || (max === undefined && value >= value))) {
          max = value;
        }
      }
    }
    return max;
  }

  var slice = Array.prototype.slice;

  function identity$4(x) {
    return x;
  }

  var top = 1,
      right = 2,
      bottom = 3,
      left = 4,
      epsilon$1 = 1e-6;

  function translateX(x) {
    return "translate(" + x + ",0)";
  }

  function translateY(y) {
    return "translate(0," + y + ")";
  }

  function number$1(scale) {
    return d => +scale(d);
  }

  function center(scale, offset) {
    offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
    if (scale.round()) offset = Math.round(offset);
    return d => +scale(d) + offset;
  }

  function entering() {
    return !this.__axis;
  }

  function axis(orient, scale) {
    var tickArguments = [],
        tickValues = null,
        tickFormat = null,
        tickSizeInner = 6,
        tickSizeOuter = 6,
        tickPadding = 3,
        offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5,
        k = orient === top || orient === left ? -1 : 1,
        x = orient === left || orient === right ? "x" : "y",
        transform = orient === top || orient === bottom ? translateX : translateY;

    function axis(context) {
      var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
          format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity$4) : tickFormat,
          spacing = Math.max(tickSizeInner, 0) + tickPadding,
          range = scale.range(),
          range0 = +range[0] + offset,
          range1 = +range[range.length - 1] + offset,
          position = (scale.bandwidth ? center : number$1)(scale.copy(), offset),
          selection = context.selection ? context.selection() : context,
          path = selection.selectAll(".domain").data([null]),
          tick = selection.selectAll(".tick").data(values, scale).order(),
          tickExit = tick.exit(),
          tickEnter = tick.enter().append("g").attr("class", "tick"),
          line = tick.select("line"),
          text = tick.select("text");

      path = path.merge(path.enter().insert("path", ".tick")
          .attr("class", "domain")
          .attr("stroke", "currentColor"));

      tick = tick.merge(tickEnter);

      line = line.merge(tickEnter.append("line")
          .attr("stroke", "currentColor")
          .attr(x + "2", k * tickSizeInner));

      text = text.merge(tickEnter.append("text")
          .attr("fill", "currentColor")
          .attr(x, k * spacing)
          .attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));

      if (context !== selection) {
        path = path.transition(context);
        tick = tick.transition(context);
        line = line.transition(context);
        text = text.transition(context);

        tickExit = tickExit.transition(context)
            .attr("opacity", epsilon$1)
            .attr("transform", function(d) { return isFinite(d = position(d)) ? transform(d + offset) : this.getAttribute("transform"); });

        tickEnter
            .attr("opacity", epsilon$1)
            .attr("transform", function(d) { var p = this.parentNode.__axis; return transform((p && isFinite(p = p(d)) ? p : position(d)) + offset); });
      }

      tickExit.remove();

      path
          .attr("d", orient === left || orient === right
              ? (tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1)
              : (tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1));

      tick
          .attr("opacity", 1)
          .attr("transform", function(d) { return transform(position(d) + offset); });

      line
          .attr(x + "2", k * tickSizeInner);

      text
          .attr(x, k * spacing)
          .text(format);

      selection.filter(entering)
          .attr("fill", "none")
          .attr("font-size", 10)
          .attr("font-family", "sans-serif")
          .attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");

      selection
          .each(function() { this.__axis = position; });
    }

    axis.scale = function(_) {
      return arguments.length ? (scale = _, axis) : scale;
    };

    axis.ticks = function() {
      return tickArguments = slice.call(arguments), axis;
    };

    axis.tickArguments = function(_) {
      return arguments.length ? (tickArguments = _ == null ? [] : slice.call(_), axis) : tickArguments.slice();
    };

    axis.tickValues = function(_) {
      return arguments.length ? (tickValues = _ == null ? null : slice.call(_), axis) : tickValues && tickValues.slice();
    };

    axis.tickFormat = function(_) {
      return arguments.length ? (tickFormat = _, axis) : tickFormat;
    };

    axis.tickSize = function(_) {
      return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
    };

    axis.tickSizeInner = function(_) {
      return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
    };

    axis.tickSizeOuter = function(_) {
      return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
    };

    axis.tickPadding = function(_) {
      return arguments.length ? (tickPadding = +_, axis) : tickPadding;
    };

    axis.offset = function(_) {
      return arguments.length ? (offset = +_, axis) : offset;
    };

    return axis;
  }

  function axisBottom(scale) {
    return axis(bottom, scale);
  }

  function axisLeft(scale) {
    return axis(left, scale);
  }

  var noop = {value: () => {}};

  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch(_);
  }

  function Dispatch(_) {
    this._ = _;
  }

  function parseTypenames$1(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
      return {type: t, name: name};
    });
  }

  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
      var _ = this._,
          T = parseTypenames$1(typename + "", _),
          t,
          i = -1,
          n = T.length;

      // If no callback was specified, return the callback of the given type and name.
      if (arguments.length < 2) {
        while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
        return;
      }

      // If a type was specified, set the callback for the given type and name.
      // Otherwise, if a null callback was specified, remove callbacks of the given name.
      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
      while (++i < n) {
        if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
        else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
      }

      return this;
    },
    copy: function() {
      var copy = {}, _ = this._;
      for (var t in _) copy[t] = _[t].slice();
      return new Dispatch(copy);
    },
    call: function(type, that) {
      if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    },
    apply: function(type, that, args) {
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    }
  };

  function get$1(type, name) {
    for (var i = 0, n = type.length, c; i < n; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }

  function set$1(type, name, callback) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }
    if (callback != null) type.push({name: name, value: callback});
    return type;
  }

  var xhtml = "http://www.w3.org/1999/xhtml";

  var namespaces = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  function namespace(name) {
    var prefix = name += "", i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
    return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
  }

  function creatorInherit(name) {
    return function() {
      var document = this.ownerDocument,
          uri = this.namespaceURI;
      return uri === xhtml && document.documentElement.namespaceURI === xhtml
          ? document.createElement(name)
          : document.createElementNS(uri, name);
    };
  }

  function creatorFixed(fullname) {
    return function() {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }

  function creator(name) {
    var fullname = namespace(name);
    return (fullname.local
        ? creatorFixed
        : creatorInherit)(fullname);
  }

  function none() {}

  function selector(selector) {
    return selector == null ? none : function() {
      return this.querySelector(selector);
    };
  }

  function selection_select(select) {
    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }

    return new Selection$1(subgroups, this._parents);
  }

  function array(x) {
    return typeof x === "object" && "length" in x
      ? x // Array, TypedArray, NodeList, array-like
      : Array.from(x); // Map, Set, iterable, string, or anything else
  }

  function empty() {
    return [];
  }

  function selectorAll(selector) {
    return selector == null ? empty : function() {
      return this.querySelectorAll(selector);
    };
  }

  function arrayAll(select) {
    return function() {
      var group = select.apply(this, arguments);
      return group == null ? [] : array(group);
    };
  }

  function selection_selectAll(select) {
    if (typeof select === "function") select = arrayAll(select);
    else select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          subgroups.push(select.call(node, node.__data__, i, group));
          parents.push(node);
        }
      }
    }

    return new Selection$1(subgroups, parents);
  }

  function matcher(selector) {
    return function() {
      return this.matches(selector);
    };
  }

  function childMatcher(selector) {
    return function(node) {
      return node.matches(selector);
    };
  }

  var find = Array.prototype.find;

  function childFind(match) {
    return function() {
      return find.call(this.children, match);
    };
  }

  function childFirst() {
    return this.firstElementChild;
  }

  function selection_selectChild(match) {
    return this.select(match == null ? childFirst
        : childFind(typeof match === "function" ? match : childMatcher(match)));
  }

  var filter = Array.prototype.filter;

  function children() {
    return this.children;
  }

  function childrenFilter(match) {
    return function() {
      return filter.call(this.children, match);
    };
  }

  function selection_selectChildren(match) {
    return this.selectAll(match == null ? children
        : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
  }

  function selection_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Selection$1(subgroups, this._parents);
  }

  function sparse(update) {
    return new Array(update.length);
  }

  function selection_enter() {
    return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
  }

  function EnterNode(parent, datum) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum;
  }

  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
    insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
    querySelector: function(selector) { return this._parent.querySelector(selector); },
    querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
  };

  function constant$2(x) {
    return function() {
      return x;
    };
  }

  function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0,
        node,
        groupLength = group.length,
        dataLength = data.length;

    // Put any non-null nodes that fit into update.
    // Put any null nodes into enter.
    // Put any remaining data into enter.
    for (; i < dataLength; ++i) {
      if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Put any non-null nodes that don’t fit into exit.
    for (; i < groupLength; ++i) {
      if (node = group[i]) {
        exit[i] = node;
      }
    }
  }

  function bindKey(parent, group, enter, update, exit, data, key) {
    var i,
        node,
        nodeByKeyValue = new Map,
        groupLength = group.length,
        dataLength = data.length,
        keyValues = new Array(groupLength),
        keyValue;

    // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.
    for (i = 0; i < groupLength; ++i) {
      if (node = group[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
        if (nodeByKeyValue.has(keyValue)) {
          exit[i] = node;
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
      }
    }

    // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.
    for (i = 0; i < dataLength; ++i) {
      keyValue = key.call(parent, data[i], i, data) + "";
      if (node = nodeByKeyValue.get(keyValue)) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue.delete(keyValue);
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Add any remaining nodes that were not bound to data to exit.
    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
        exit[i] = node;
      }
    }
  }

  function datum(node) {
    return node.__data__;
  }

  function selection_data(value, key) {
    if (!arguments.length) return Array.from(this, datum);

    var bind = key ? bindKey : bindIndex,
        parents = this._parents,
        groups = this._groups;

    if (typeof value !== "function") value = constant$2(value);

    for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j],
          group = groups[j],
          groupLength = group.length,
          data = array(value.call(parent, parent && parent.__data__, j, parents)),
          dataLength = data.length,
          enterGroup = enter[j] = new Array(dataLength),
          updateGroup = update[j] = new Array(dataLength),
          exitGroup = exit[j] = new Array(groupLength);

      bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

      // Now connect the enter nodes to their following update node, such that
      // appendChild can insert the materialized enter node before this node,
      // rather than at the end of the parent node.
      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if (previous = enterGroup[i0]) {
          if (i0 >= i1) i1 = i0 + 1;
          while (!(next = updateGroup[i1]) && ++i1 < dataLength);
          previous._next = next || null;
        }
      }
    }

    update = new Selection$1(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }

  function selection_exit() {
    return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
  }

  function selection_join(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
    if (onupdate != null) update = onupdate(update);
    if (onexit == null) exit.remove(); else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }

  function selection_merge(selection) {
    if (!(selection instanceof Selection$1)) throw new Error("invalid merge");

    for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Selection$1(merges, this._parents);
  }

  function selection_order() {

    for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
      for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
        if (node = group[i]) {
          if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }

    return this;
  }

  function selection_sort(compare) {
    if (!compare) compare = ascending;

    function compareNode(a, b) {
      return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }

    for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          sortgroup[i] = node;
        }
      }
      sortgroup.sort(compareNode);
    }

    return new Selection$1(sortgroups, this._parents).order();
  }

  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function selection_call() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  function selection_nodes() {
    return Array.from(this);
  }

  function selection_node() {

    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
        var node = group[i];
        if (node) return node;
      }
    }

    return null;
  }

  function selection_size() {
    let size = 0;
    for (const node of this) ++size; // eslint-disable-line no-unused-vars
    return size;
  }

  function selection_empty() {
    return !this.node();
  }

  function selection_each(callback) {

    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) callback.call(node, node.__data__, i, group);
      }
    }

    return this;
  }

  function attrRemove$1(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS$1(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant$1(name, value) {
    return function() {
      this.setAttribute(name, value);
    };
  }

  function attrConstantNS$1(fullname, value) {
    return function() {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }

  function attrFunction$1(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttribute(name);
      else this.setAttribute(name, v);
    };
  }

  function attrFunctionNS$1(fullname, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
      else this.setAttributeNS(fullname.space, fullname.local, v);
    };
  }

  function selection_attr(name, value) {
    var fullname = namespace(name);

    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local
          ? node.getAttributeNS(fullname.space, fullname.local)
          : node.getAttribute(fullname);
    }

    return this.each((value == null
        ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
        ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
        : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
  }

  function defaultView(node) {
    return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
        || (node.document && node) // node is a Window
        || node.defaultView; // node is a Document
  }

  function styleRemove$1(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant$1(name, value, priority) {
    return function() {
      this.style.setProperty(name, value, priority);
    };
  }

  function styleFunction$1(name, value, priority) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.style.removeProperty(name);
      else this.style.setProperty(name, v, priority);
    };
  }

  function selection_style(name, value, priority) {
    return arguments.length > 1
        ? this.each((value == null
              ? styleRemove$1 : typeof value === "function"
              ? styleFunction$1
              : styleConstant$1)(name, value, priority == null ? "" : priority))
        : styleValue(this.node(), name);
  }

  function styleValue(node, name) {
    return node.style.getPropertyValue(name)
        || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
  }

  function propertyRemove(name) {
    return function() {
      delete this[name];
    };
  }

  function propertyConstant(name, value) {
    return function() {
      this[name] = value;
    };
  }

  function propertyFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) delete this[name];
      else this[name] = v;
    };
  }

  function selection_property(name, value) {
    return arguments.length > 1
        ? this.each((value == null
            ? propertyRemove : typeof value === "function"
            ? propertyFunction
            : propertyConstant)(name, value))
        : this.node()[name];
  }

  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }

  function classList(node) {
    return node.classList || new ClassList(node);
  }

  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }

  ClassList.prototype = {
    add: function(name) {
      var i = this._names.indexOf(name);
      if (i < 0) {
        this._names.push(name);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    remove: function(name) {
      var i = this._names.indexOf(name);
      if (i >= 0) {
        this._names.splice(i, 1);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    contains: function(name) {
      return this._names.indexOf(name) >= 0;
    }
  };

  function classedAdd(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n) list.add(names[i]);
  }

  function classedRemove(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n) list.remove(names[i]);
  }

  function classedTrue(names) {
    return function() {
      classedAdd(this, names);
    };
  }

  function classedFalse(names) {
    return function() {
      classedRemove(this, names);
    };
  }

  function classedFunction(names, value) {
    return function() {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }

  function selection_classed(name, value) {
    var names = classArray(name + "");

    if (arguments.length < 2) {
      var list = classList(this.node()), i = -1, n = names.length;
      while (++i < n) if (!list.contains(names[i])) return false;
      return true;
    }

    return this.each((typeof value === "function"
        ? classedFunction : value
        ? classedTrue
        : classedFalse)(names, value));
  }

  function textRemove() {
    this.textContent = "";
  }

  function textConstant$1(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction$1(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    };
  }

  function selection_text(value) {
    return arguments.length
        ? this.each(value == null
            ? textRemove : (typeof value === "function"
            ? textFunction$1
            : textConstant$1)(value))
        : this.node().textContent;
  }

  function htmlRemove() {
    this.innerHTML = "";
  }

  function htmlConstant(value) {
    return function() {
      this.innerHTML = value;
    };
  }

  function htmlFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    };
  }

  function selection_html(value) {
    return arguments.length
        ? this.each(value == null
            ? htmlRemove : (typeof value === "function"
            ? htmlFunction
            : htmlConstant)(value))
        : this.node().innerHTML;
  }

  function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
  }

  function selection_raise() {
    return this.each(raise);
  }

  function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }

  function selection_lower() {
    return this.each(lower);
  }

  function selection_append(name) {
    var create = typeof name === "function" ? name : creator(name);
    return this.select(function() {
      return this.appendChild(create.apply(this, arguments));
    });
  }

  function constantNull() {
    return null;
  }

  function selection_insert(name, before) {
    var create = typeof name === "function" ? name : creator(name),
        select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
    return this.select(function() {
      return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
    });
  }

  function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  }

  function selection_remove() {
    return this.each(remove);
  }

  function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_clone(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  function selection_datum(value) {
    return arguments.length
        ? this.property("__data__", value)
        : this.node().__data__;
  }

  function contextListener(listener) {
    return function(event) {
      listener.call(this, event, this.__data__);
    };
  }

  function parseTypenames(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      return {type: t, name: name};
    });
  }

  function onRemove(typename) {
    return function() {
      var on = this.__on;
      if (!on) return;
      for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
        if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
        } else {
          on[++i] = o;
        }
      }
      if (++i) on.length = i;
      else delete this.__on;
    };
  }

  function onAdd(typename, value, options) {
    return function() {
      var on = this.__on, o, listener = contextListener(value);
      if (on) for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value;
          return;
        }
      }
      this.addEventListener(typename.type, listener, options);
      o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
      if (!on) this.__on = [o];
      else on.push(o);
    };
  }

  function selection_on(typename, value, options) {
    var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

    if (arguments.length < 2) {
      var on = this.node().__on;
      if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
        for (i = 0, o = on[j]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
      return;
    }

    on = value ? onAdd : onRemove;
    for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
    return this;
  }

  function dispatchEvent(node, type, params) {
    var window = defaultView(node),
        event = window.CustomEvent;

    if (typeof event === "function") {
      event = new event(type, params);
    } else {
      event = window.document.createEvent("Event");
      if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
      else event.initEvent(type, false, false);
    }

    node.dispatchEvent(event);
  }

  function dispatchConstant(type, params) {
    return function() {
      return dispatchEvent(this, type, params);
    };
  }

  function dispatchFunction(type, params) {
    return function() {
      return dispatchEvent(this, type, params.apply(this, arguments));
    };
  }

  function selection_dispatch(type, params) {
    return this.each((typeof params === "function"
        ? dispatchFunction
        : dispatchConstant)(type, params));
  }

  function* selection_iterator() {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) yield node;
      }
    }
  }

  var root = [null];

  function Selection$1(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }

  function selection() {
    return new Selection$1([[document.documentElement]], root);
  }

  function selection_selection() {
    return this;
  }

  Selection$1.prototype = selection.prototype = {
    constructor: Selection$1,
    select: selection_select,
    selectAll: selection_selectAll,
    selectChild: selection_selectChild,
    selectChildren: selection_selectChildren,
    filter: selection_filter,
    data: selection_data,
    enter: selection_enter,
    exit: selection_exit,
    join: selection_join,
    merge: selection_merge,
    selection: selection_selection,
    order: selection_order,
    sort: selection_sort,
    call: selection_call,
    nodes: selection_nodes,
    node: selection_node,
    size: selection_size,
    empty: selection_empty,
    each: selection_each,
    attr: selection_attr,
    style: selection_style,
    property: selection_property,
    classed: selection_classed,
    text: selection_text,
    html: selection_html,
    raise: selection_raise,
    lower: selection_lower,
    append: selection_append,
    insert: selection_insert,
    remove: selection_remove,
    clone: selection_clone,
    datum: selection_datum,
    on: selection_on,
    dispatch: selection_dispatch,
    [Symbol.iterator]: selection_iterator
  };

  function select(selector) {
    return typeof selector === "string"
        ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
        : new Selection$1([[selector]], root);
  }

  function create$1(name) {
    return select(creator(name).call(document.documentElement));
  }

  function sourceEvent(event) {
    let sourceEvent;
    while (sourceEvent = event.sourceEvent) event = sourceEvent;
    return event;
  }

  function pointer(event, node) {
    event = sourceEvent(event);
    if (node === undefined) node = event.currentTarget;
    if (node) {
      var svg = node.ownerSVGElement || node;
      if (svg.createSVGPoint) {
        var point = svg.createSVGPoint();
        point.x = event.clientX, point.y = event.clientY;
        point = point.matrixTransform(node.getScreenCTM().inverse());
        return [point.x, point.y];
      }
      if (node.getBoundingClientRect) {
        var rect = node.getBoundingClientRect();
        return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
      }
    }
    return [event.pageX, event.pageY];
  }

  function noevent$1(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function dragDisable(view) {
    var root = view.document.documentElement,
        selection = select(view).on("dragstart.drag", noevent$1, true);
    if ("onselectstart" in root) {
      selection.on("selectstart.drag", noevent$1, true);
    } else {
      root.__noselect = root.style.MozUserSelect;
      root.style.MozUserSelect = "none";
    }
  }

  function yesdrag(view, noclick) {
    var root = view.document.documentElement,
        selection = select(view).on("dragstart.drag", null);
    if (noclick) {
      selection.on("click.drag", noevent$1, true);
      setTimeout(function() { selection.on("click.drag", null); }, 0);
    }
    if ("onselectstart" in root) {
      selection.on("selectstart.drag", null);
    } else {
      root.style.MozUserSelect = root.__noselect;
      delete root.__noselect;
    }
  }

  function define(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }

  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }

  function Color() {}

  var darker = 0.7;
  var brighter = 1 / darker;

  var reI = "\\s*([+-]?\\d+)\\s*",
      reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
      reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
      reHex = /^#([0-9a-f]{3,8})$/,
      reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
      reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
      reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
      reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
      reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
      reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };

  define(Color, color, {
    copy: function(channels) {
      return Object.assign(new this.constructor, this, channels);
    },
    displayable: function() {
      return this.rgb().displayable();
    },
    hex: color_formatHex, // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });

  function color_formatHex() {
    return this.rgb().formatHex();
  }

  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }

  function color_formatRgb() {
    return this.rgb().formatRgb();
  }

  function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
        : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
        : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
        : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
        : null) // invalid hex
        : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
        : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
        : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
        : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
        : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
        : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
        : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
        : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
        : null;
  }

  function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }

  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }

  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb;
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }

  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }

  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }

  define(Rgb, rgb, extend(Color, {
    brighter: function(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function() {
      return this;
    },
    displayable: function() {
      return (-0.5 <= this.r && this.r < 255.5)
          && (-0.5 <= this.g && this.g < 255.5)
          && (-0.5 <= this.b && this.b < 255.5)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    hex: rgb_formatHex, // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));

  function rgb_formatHex() {
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
  }

  function rgb_formatRgb() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(")
        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
        + (a === 1 ? ")" : ", " + a + ")");
  }

  function hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
  }

  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }

  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl;
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        h = NaN,
        s = max - min,
        l = (max + min) / 2;
    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6;
      else if (g === max) h = (b - r) / s + 2;
      else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s, l, o.opacity);
  }

  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }

  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Hsl, hsl, extend(Color, {
    brighter: function(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
      var h = this.h % 360 + (this.h < 0) * 360,
          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
          l = this.l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
      return new Rgb(
        hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
        hsl2rgb(h, m1, m2),
        hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
        this.opacity
      );
    },
    displayable: function() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s))
          && (0 <= this.l && this.l <= 1)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    formatHsl: function() {
      var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "hsl(" : "hsla(")
          + (this.h || 0) + ", "
          + (this.s || 0) * 100 + "%, "
          + (this.l || 0) * 100 + "%"
          + (a === 1 ? ")" : ", " + a + ")");
    }
  }));

  /* From FvD 13.37, CSS Color Module Level 3 */
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60
        : h < 180 ? m2
        : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
        : m1) * 255;
  }

  var constant$1 = x => () => x;

  function linear$1(a, d) {
    return function(t) {
      return a + t * d;
    };
  }

  function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
      return Math.pow(a + t * b, y);
    };
  }

  function gamma(y) {
    return (y = +y) === 1 ? nogamma : function(a, b) {
      return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
    };
  }

  function nogamma(a, b) {
    var d = b - a;
    return d ? linear$1(a, d) : constant$1(isNaN(a) ? b : a);
  }

  var interpolateRgb = (function rgbGamma(y) {
    var color = gamma(y);

    function rgb$1(start, end) {
      var r = color((start = rgb(start)).r, (end = rgb(end)).r),
          g = color(start.g, end.g),
          b = color(start.b, end.b),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.r = r(t);
        start.g = g(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }

    rgb$1.gamma = rgbGamma;

    return rgb$1;
  })(1);

  function numberArray(a, b) {
    if (!b) b = [];
    var n = a ? Math.min(b.length, a.length) : 0,
        c = b.slice(),
        i;
    return function(t) {
      for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
      return c;
    };
  }

  function isNumberArray(x) {
    return ArrayBuffer.isView(x) && !(x instanceof DataView);
  }

  function genericArray(a, b) {
    var nb = b ? b.length : 0,
        na = a ? Math.min(nb, a.length) : 0,
        x = new Array(na),
        c = new Array(nb),
        i;

    for (i = 0; i < na; ++i) x[i] = interpolate$1(a[i], b[i]);
    for (; i < nb; ++i) c[i] = b[i];

    return function(t) {
      for (i = 0; i < na; ++i) c[i] = x[i](t);
      return c;
    };
  }

  function date(a, b) {
    var d = new Date;
    return a = +a, b = +b, function(t) {
      return d.setTime(a * (1 - t) + b * t), d;
    };
  }

  function interpolateNumber(a, b) {
    return a = +a, b = +b, function(t) {
      return a * (1 - t) + b * t;
    };
  }

  function object(a, b) {
    var i = {},
        c = {},
        k;

    if (a === null || typeof a !== "object") a = {};
    if (b === null || typeof b !== "object") b = {};

    for (k in b) {
      if (k in a) {
        i[k] = interpolate$1(a[k], b[k]);
      } else {
        c[k] = b[k];
      }
    }

    return function(t) {
      for (k in i) c[k] = i[k](t);
      return c;
    };
  }

  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      reB = new RegExp(reA.source, "g");

  function zero(b) {
    return function() {
      return b;
    };
  }

  function one(b) {
    return function(t) {
      return b(t) + "";
    };
  }

  function interpolateString(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
        am, // current match in a
        bm, // current match in b
        bs, // string preceding current number in b, if any
        i = -1, // index in s
        s = [], // string constants and placeholders
        q = []; // number interpolators

    // Coerce inputs to strings.
    a = a + "", b = b + "";

    // Interpolate pairs of numbers in a & b.
    while ((am = reA.exec(a))
        && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) { // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
        if (s[i]) s[i] += bm; // coalesce with previous string
        else s[++i] = bm;
      } else { // interpolate non-matching numbers
        s[++i] = null;
        q.push({i: i, x: interpolateNumber(am, bm)});
      }
      bi = reB.lastIndex;
    }

    // Add remains of b.
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.
    return s.length < 2 ? (q[0]
        ? one(q[0].x)
        : zero(b))
        : (b = q.length, function(t) {
            for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
            return s.join("");
          });
  }

  function interpolate$1(a, b) {
    var t = typeof b, c;
    return b == null || t === "boolean" ? constant$1(b)
        : (t === "number" ? interpolateNumber
        : t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
        : b instanceof color ? interpolateRgb
        : b instanceof Date ? date
        : isNumberArray(b) ? numberArray
        : Array.isArray(b) ? genericArray
        : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
        : interpolateNumber)(a, b);
  }

  function interpolateRound(a, b) {
    return a = +a, b = +b, function(t) {
      return Math.round(a * (1 - t) + b * t);
    };
  }

  var degrees = 180 / Math.PI;

  var identity$3 = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };

  function decompose(a, b, c, d, e, f) {
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
    if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
    if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
    if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
      translateX: e,
      translateY: f,
      rotate: Math.atan2(b, a) * degrees,
      skewX: Math.atan(skewX) * degrees,
      scaleX: scaleX,
      scaleY: scaleY
    };
  }

  var svgNode;

  /* eslint-disable no-undef */
  function parseCss(value) {
    const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
    return m.isIdentity ? identity$3 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
  }

  function parseSvg(value) {
    if (value == null) return identity$3;
    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate())) return identity$3;
    value = value.matrix;
    return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
  }

  function interpolateTransform(parse, pxComma, pxParen, degParen) {

    function pop(s) {
      return s.length ? s.pop() + " " : "";
    }

    function translate(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push("translate(", null, pxComma, null, pxParen);
        q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
      } else if (xb || yb) {
        s.push("translate(" + xb + pxComma + yb + pxParen);
      }
    }

    function rotate(a, b, s, q) {
      if (a !== b) {
        if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
        q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
      } else if (b) {
        s.push(pop(s) + "rotate(" + b + degParen);
      }
    }

    function skewX(a, b, s, q) {
      if (a !== b) {
        q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
      } else if (b) {
        s.push(pop(s) + "skewX(" + b + degParen);
      }
    }

    function scale(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push(pop(s) + "scale(", null, ",", null, ")");
        q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
      } else if (xb !== 1 || yb !== 1) {
        s.push(pop(s) + "scale(" + xb + "," + yb + ")");
      }
    }

    return function(a, b) {
      var s = [], // string constants and placeholders
          q = []; // number interpolators
      a = parse(a), b = parse(b);
      translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
      rotate(a.rotate, b.rotate, s, q);
      skewX(a.skewX, b.skewX, s, q);
      scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
      a = b = null; // gc
      return function(t) {
        var i = -1, n = q.length, o;
        while (++i < n) s[(o = q[i]).i] = o.x(t);
        return s.join("");
      };
    };
  }

  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

  var epsilon2 = 1e-12;

  function cosh(x) {
    return ((x = Math.exp(x)) + 1 / x) / 2;
  }

  function sinh(x) {
    return ((x = Math.exp(x)) - 1 / x) / 2;
  }

  function tanh(x) {
    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
  }

  var interpolateZoom = (function zoomRho(rho, rho2, rho4) {

    // p0 = [ux0, uy0, w0]
    // p1 = [ux1, uy1, w1]
    function zoom(p0, p1) {
      var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
          ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
          dx = ux1 - ux0,
          dy = uy1 - uy0,
          d2 = dx * dx + dy * dy,
          i,
          S;

      // Special case for u0 ≅ u1.
      if (d2 < epsilon2) {
        S = Math.log(w1 / w0) / rho;
        i = function(t) {
          return [
            ux0 + t * dx,
            uy0 + t * dy,
            w0 * Math.exp(rho * t * S)
          ];
        };
      }

      // General case.
      else {
        var d1 = Math.sqrt(d2),
            b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
            b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
            r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
            r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
        S = (r1 - r0) / rho;
        i = function(t) {
          var s = t * S,
              coshr0 = cosh(r0),
              u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
          return [
            ux0 + u * dx,
            uy0 + u * dy,
            w0 * coshr0 / cosh(rho * s + r0)
          ];
        };
      }

      i.duration = S * 1000 * rho / Math.SQRT2;

      return i;
    }

    zoom.rho = function(_) {
      var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
      return zoomRho(_1, _2, _4);
    };

    return zoom;
  })(Math.SQRT2, 2, 4);

  var frame = 0, // is an animation frame pending?
      timeout$1 = 0, // is a timeout pending?
      interval = 0, // are any timers active?
      pokeDelay = 1000, // how frequently we check for clock skew
      taskHead,
      taskTail,
      clockLast = 0,
      clockNow = 0,
      clockSkew = 0,
      clock = typeof performance === "object" && performance.now ? performance : Date,
      setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }

  function clearNow() {
    clockNow = 0;
  }

  function Timer() {
    this._call =
    this._time =
    this._next = null;
  }

  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
      if (typeof callback !== "function") throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
      if (!this._next && taskTail !== this) {
        if (taskTail) taskTail._next = this;
        else taskHead = this;
        taskTail = this;
      }
      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };

  function timer(callback, delay, time) {
    var t = new Timer;
    t.restart(callback, delay, time);
    return t;
  }

  function timerFlush() {
    now(); // Get the current time, if not already set.
    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
    var t = taskHead, e;
    while (t) {
      if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
      t = t._next;
    }
    --frame;
  }

  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout$1 = 0;
    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }

  function poke() {
    var now = clock.now(), delay = now - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
  }

  function nap() {
    var t0, t1 = taskHead, t2, time = Infinity;
    while (t1) {
      if (t1._call) {
        if (time > t1._time) time = t1._time;
        t0 = t1, t1 = t1._next;
      } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
      }
    }
    taskTail = t0;
    sleep(time);
  }

  function sleep(time) {
    if (frame) return; // Soonest alarm already set, or will be.
    if (timeout$1) timeout$1 = clearTimeout(timeout$1);
    var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
    if (delay > 24) {
      if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval) interval = clearInterval(interval);
    } else {
      if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }

  function timeout(callback, delay, time) {
    var t = new Timer;
    delay = delay == null ? 0 : +delay;
    t.restart(elapsed => {
      t.stop();
      callback(elapsed + delay);
    }, delay, time);
    return t;
  }

  var emptyOn = dispatch("start", "end", "cancel", "interrupt");
  var emptyTween = [];

  var CREATED = 0;
  var SCHEDULED = 1;
  var STARTING = 2;
  var STARTED = 3;
  var RUNNING = 4;
  var ENDING = 5;
  var ENDED = 6;

  function schedule(node, name, id, index, group, timing) {
    var schedules = node.__transition;
    if (!schedules) node.__transition = {};
    else if (id in schedules) return;
    create(node, id, {
      name: name,
      index: index, // For context during callback.
      group: group, // For context during callback.
      on: emptyOn,
      tween: emptyTween,
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null,
      state: CREATED
    });
  }

  function init(node, id) {
    var schedule = get(node, id);
    if (schedule.state > CREATED) throw new Error("too late; already scheduled");
    return schedule;
  }

  function set(node, id) {
    var schedule = get(node, id);
    if (schedule.state > STARTED) throw new Error("too late; already running");
    return schedule;
  }

  function get(node, id) {
    var schedule = node.__transition;
    if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
    return schedule;
  }

  function create(node, id, self) {
    var schedules = node.__transition,
        tween;

    // Initialize the self timer when the transition is created.
    // Note the actual delay is not known until the first callback!
    schedules[id] = self;
    self.timer = timer(schedule, 0, self.time);

    function schedule(elapsed) {
      self.state = SCHEDULED;
      self.timer.restart(start, self.delay, self.time);

      // If the elapsed delay is less than our first sleep, start immediately.
      if (self.delay <= elapsed) start(elapsed - self.delay);
    }

    function start(elapsed) {
      var i, j, n, o;

      // If the state is not SCHEDULED, then we previously errored on start.
      if (self.state !== SCHEDULED) return stop();

      for (i in schedules) {
        o = schedules[i];
        if (o.name !== self.name) continue;

        // While this element already has a starting transition during this frame,
        // defer starting an interrupting transition until that transition has a
        // chance to tick (and possibly end); see d3/d3-transition#54!
        if (o.state === STARTED) return timeout(start);

        // Interrupt the active transition, if any.
        if (o.state === RUNNING) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("interrupt", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }

        // Cancel any pre-empted transitions.
        else if (+i < id) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("cancel", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }
      }

      // Defer the first tick to end of the current frame; see d3/d3#1576.
      // Note the transition may be canceled after start and before the first tick!
      // Note this must be scheduled before the start event; see d3/d3-transition#16!
      // Assuming this is successful, subsequent callbacks go straight to tick.
      timeout(function() {
        if (self.state === STARTED) {
          self.state = RUNNING;
          self.timer.restart(tick, self.delay, self.time);
          tick(elapsed);
        }
      });

      // Dispatch the start event.
      // Note this must be done before the tween are initialized.
      self.state = STARTING;
      self.on.call("start", node, node.__data__, self.index, self.group);
      if (self.state !== STARTING) return; // interrupted
      self.state = STARTED;

      // Initialize the tween, deleting null tween.
      tween = new Array(n = self.tween.length);
      for (i = 0, j = -1; i < n; ++i) {
        if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
          tween[++j] = o;
        }
      }
      tween.length = j + 1;
    }

    function tick(elapsed) {
      var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
          i = -1,
          n = tween.length;

      while (++i < n) {
        tween[i].call(node, t);
      }

      // Dispatch the end event.
      if (self.state === ENDING) {
        self.on.call("end", node, node.__data__, self.index, self.group);
        stop();
      }
    }

    function stop() {
      self.state = ENDED;
      self.timer.stop();
      delete schedules[id];
      for (var i in schedules) return; // eslint-disable-line no-unused-vars
      delete node.__transition;
    }
  }

  function interrupt(node, name) {
    var schedules = node.__transition,
        schedule,
        active,
        empty = true,
        i;

    if (!schedules) return;

    name = name == null ? null : name + "";

    for (i in schedules) {
      if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
      active = schedule.state > STARTING && schedule.state < ENDING;
      schedule.state = ENDED;
      schedule.timer.stop();
      schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
      delete schedules[i];
    }

    if (empty) delete node.__transition;
  }

  function selection_interrupt(name) {
    return this.each(function() {
      interrupt(this, name);
    });
  }

  function tweenRemove(id, name) {
    var tween0, tween1;
    return function() {
      var schedule = set(this, id),
          tween = schedule.tween;

      // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.
      if (tween !== tween0) {
        tween1 = tween0 = tween;
        for (var i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1 = tween1.slice();
            tween1.splice(i, 1);
            break;
          }
        }
      }

      schedule.tween = tween1;
    };
  }

  function tweenFunction(id, name, value) {
    var tween0, tween1;
    if (typeof value !== "function") throw new Error;
    return function() {
      var schedule = set(this, id),
          tween = schedule.tween;

      // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.
      if (tween !== tween0) {
        tween1 = (tween0 = tween).slice();
        for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1[i] = t;
            break;
          }
        }
        if (i === n) tween1.push(t);
      }

      schedule.tween = tween1;
    };
  }

  function transition_tween(name, value) {
    var id = this._id;

    name += "";

    if (arguments.length < 2) {
      var tween = get(this.node(), id).tween;
      for (var i = 0, n = tween.length, t; i < n; ++i) {
        if ((t = tween[i]).name === name) {
          return t.value;
        }
      }
      return null;
    }

    return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
  }

  function tweenValue(transition, name, value) {
    var id = transition._id;

    transition.each(function() {
      var schedule = set(this, id);
      (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    });

    return function(node) {
      return get(node, id).value[name];
    };
  }

  function interpolate(a, b) {
    var c;
    return (typeof b === "number" ? interpolateNumber
        : b instanceof color ? interpolateRgb
        : (c = color(b)) ? (b = c, interpolateRgb)
        : interpolateString)(a, b);
  }

  function attrRemove(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = this.getAttribute(name);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrConstantNS(fullname, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = this.getAttributeNS(fullname.space, fullname.local);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrFunction(name, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttribute(name);
      string0 = this.getAttribute(name);
      string1 = value1 + "";
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function attrFunctionNS(fullname, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
      string0 = this.getAttributeNS(fullname.space, fullname.local);
      string1 = value1 + "";
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function transition_attr(name, value) {
    var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
    return this.attrTween(name, typeof value === "function"
        ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
        : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
        : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
  }

  function attrInterpolate(name, i) {
    return function(t) {
      this.setAttribute(name, i.call(this, t));
    };
  }

  function attrInterpolateNS(fullname, i) {
    return function(t) {
      this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
    };
  }

  function attrTweenNS(fullname, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function attrTween(name, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function transition_attrTween(name, value) {
    var key = "attr." + name;
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    var fullname = namespace(name);
    return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
  }

  function delayFunction(id, value) {
    return function() {
      init(this, id).delay = +value.apply(this, arguments);
    };
  }

  function delayConstant(id, value) {
    return value = +value, function() {
      init(this, id).delay = value;
    };
  }

  function transition_delay(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? delayFunction
            : delayConstant)(id, value))
        : get(this.node(), id).delay;
  }

  function durationFunction(id, value) {
    return function() {
      set(this, id).duration = +value.apply(this, arguments);
    };
  }

  function durationConstant(id, value) {
    return value = +value, function() {
      set(this, id).duration = value;
    };
  }

  function transition_duration(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? durationFunction
            : durationConstant)(id, value))
        : get(this.node(), id).duration;
  }

  function easeConstant(id, value) {
    if (typeof value !== "function") throw new Error;
    return function() {
      set(this, id).ease = value;
    };
  }

  function transition_ease(value) {
    var id = this._id;

    return arguments.length
        ? this.each(easeConstant(id, value))
        : get(this.node(), id).ease;
  }

  function easeVarying(id, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (typeof v !== "function") throw new Error;
      set(this, id).ease = v;
    };
  }

  function transition_easeVarying(value) {
    if (typeof value !== "function") throw new Error;
    return this.each(easeVarying(this._id, value));
  }

  function transition_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Transition(subgroups, this._parents, this._name, this._id);
  }

  function transition_merge(transition) {
    if (transition._id !== this._id) throw new Error;

    for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Transition(merges, this._parents, this._name, this._id);
  }

  function start(name) {
    return (name + "").trim().split(/^|\s+/).every(function(t) {
      var i = t.indexOf(".");
      if (i >= 0) t = t.slice(0, i);
      return !t || t === "start";
    });
  }

  function onFunction(id, name, listener) {
    var on0, on1, sit = start(name) ? init : set;
    return function() {
      var schedule = sit(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

      schedule.on = on1;
    };
  }

  function transition_on(name, listener) {
    var id = this._id;

    return arguments.length < 2
        ? get(this.node(), id).on.on(name)
        : this.each(onFunction(id, name, listener));
  }

  function removeFunction(id) {
    return function() {
      var parent = this.parentNode;
      for (var i in this.__transition) if (+i !== id) return;
      if (parent) parent.removeChild(this);
    };
  }

  function transition_remove() {
    return this.on("end.remove", removeFunction(this._id));
  }

  function transition_select(select) {
    var name = this._name,
        id = this._id;

    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
          schedule(subgroup[i], name, id, i, subgroup, get(node, id));
        }
      }
    }

    return new Transition(subgroups, this._parents, name, id);
  }

  function transition_selectAll(select) {
    var name = this._name,
        id = this._id;

    if (typeof select !== "function") select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
            if (child = children[k]) {
              schedule(child, name, id, k, children, inherit);
            }
          }
          subgroups.push(children);
          parents.push(node);
        }
      }
    }

    return new Transition(subgroups, parents, name, id);
  }

  var Selection = selection.prototype.constructor;

  function transition_selection() {
    return new Selection(this._groups, this._parents);
  }

  function styleNull(name, interpolate) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0 = styleValue(this, name),
          string1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, string10 = string1);
    };
  }

  function styleRemove(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = styleValue(this, name);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function styleFunction(name, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0 = styleValue(this, name),
          value1 = value(this),
          string1 = value1 + "";
      if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function styleMaybeRemove(id, name) {
    var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
    return function() {
      var schedule = set(this, id),
          on = schedule.on,
          listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

      schedule.on = on1;
    };
  }

  function transition_style(name, value, priority) {
    var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
    return value == null ? this
        .styleTween(name, styleNull(name, i))
        .on("end.style." + name, styleRemove(name))
      : typeof value === "function" ? this
        .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
        .each(styleMaybeRemove(this._id, name))
      : this
        .styleTween(name, styleConstant(name, i, value), priority)
        .on("end.style." + name, null);
  }

  function styleInterpolate(name, i, priority) {
    return function(t) {
      this.style.setProperty(name, i.call(this, t), priority);
    };
  }

  function styleTween(name, value, priority) {
    var t, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
      return t;
    }
    tween._value = value;
    return tween;
  }

  function transition_styleTween(name, value, priority) {
    var key = "style." + (name += "");
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
  }

  function textConstant(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction(value) {
    return function() {
      var value1 = value(this);
      this.textContent = value1 == null ? "" : value1;
    };
  }

  function transition_text(value) {
    return this.tween("text", typeof value === "function"
        ? textFunction(tweenValue(this, "text", value))
        : textConstant(value == null ? "" : value + ""));
  }

  function textInterpolate(i) {
    return function(t) {
      this.textContent = i.call(this, t);
    };
  }

  function textTween(value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function transition_textTween(value) {
    var key = "text";
    if (arguments.length < 1) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, textTween(value));
  }

  function transition_transition() {
    var name = this._name,
        id0 = this._id,
        id1 = newId();

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          var inherit = get(node, id0);
          schedule(node, name, id1, i, group, {
            time: inherit.time + inherit.delay + inherit.duration,
            delay: 0,
            duration: inherit.duration,
            ease: inherit.ease
          });
        }
      }
    }

    return new Transition(groups, this._parents, name, id1);
  }

  function transition_end() {
    var on0, on1, that = this, id = that._id, size = that.size();
    return new Promise(function(resolve, reject) {
      var cancel = {value: reject},
          end = {value: function() { if (--size === 0) resolve(); }};

      that.each(function() {
        var schedule = set(this, id),
            on = schedule.on;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0) {
          on1 = (on0 = on).copy();
          on1._.cancel.push(cancel);
          on1._.interrupt.push(cancel);
          on1._.end.push(end);
        }

        schedule.on = on1;
      });

      // The selection was empty, resolve end immediately
      if (size === 0) resolve();
    });
  }

  var id = 0;

  function Transition(groups, parents, name, id) {
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = id;
  }

  function newId() {
    return ++id;
  }

  var selection_prototype = selection.prototype;

  Transition.prototype = {
    constructor: Transition,
    select: transition_select,
    selectAll: transition_selectAll,
    filter: transition_filter,
    merge: transition_merge,
    selection: transition_selection,
    transition: transition_transition,
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: transition_on,
    attr: transition_attr,
    attrTween: transition_attrTween,
    style: transition_style,
    styleTween: transition_styleTween,
    text: transition_text,
    textTween: transition_textTween,
    remove: transition_remove,
    tween: transition_tween,
    delay: transition_delay,
    duration: transition_duration,
    ease: transition_ease,
    easeVarying: transition_easeVarying,
    end: transition_end,
    [Symbol.iterator]: selection_prototype[Symbol.iterator]
  };

  function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  }

  var defaultTiming = {
    time: null, // Set on use.
    delay: 0,
    duration: 250,
    ease: cubicInOut
  };

  function inherit(node, id) {
    var timing;
    while (!(timing = node.__transition) || !(timing = timing[id])) {
      if (!(node = node.parentNode)) {
        throw new Error(`transition ${id} not found`);
      }
    }
    return timing;
  }

  function selection_transition(name) {
    var id,
        timing;

    if (name instanceof Transition) {
      id = name._id, name = name._name;
    } else {
      id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
    }

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          schedule(node, name, id, i, group, timing || inherit(node, id));
        }
      }
    }

    return new Transition(groups, this._parents, name, id);
  }

  selection.prototype.interrupt = selection_interrupt;
  selection.prototype.transition = selection_transition;

  const pi = Math.PI,
      tau = 2 * pi,
      epsilon = 1e-6,
      tauEpsilon = tau - epsilon;

  function Path() {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null; // end of current subpath
    this._ = "";
  }

  function path() {
    return new Path;
  }

  Path.prototype = path.prototype = {
    constructor: Path,
    moveTo: function(x, y) {
      this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
    },
    closePath: function() {
      if (this._x1 !== null) {
        this._x1 = this._x0, this._y1 = this._y0;
        this._ += "Z";
      }
    },
    lineTo: function(x, y) {
      this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    quadraticCurveTo: function(x1, y1, x, y) {
      this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    bezierCurveTo: function(x1, y1, x2, y2, x, y) {
      this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    arcTo: function(x1, y1, x2, y2, r) {
      x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
      var x0 = this._x1,
          y0 = this._y1,
          x21 = x2 - x1,
          y21 = y2 - y1,
          x01 = x0 - x1,
          y01 = y0 - y1,
          l01_2 = x01 * x01 + y01 * y01;

      // Is the radius negative? Error.
      if (r < 0) throw new Error("negative radius: " + r);

      // Is this path empty? Move to (x1,y1).
      if (this._x1 === null) {
        this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
      }

      // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
      else if (!(l01_2 > epsilon));

      // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
      // Equivalently, is (x1,y1) coincident with (x2,y2)?
      // Or, is the radius zero? Line to (x1,y1).
      else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
        this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
      }

      // Otherwise, draw an arc!
      else {
        var x20 = x2 - x0,
            y20 = y2 - y0,
            l21_2 = x21 * x21 + y21 * y21,
            l20_2 = x20 * x20 + y20 * y20,
            l21 = Math.sqrt(l21_2),
            l01 = Math.sqrt(l01_2),
            l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
            t01 = l / l01,
            t21 = l / l21;

        // If the start tangent is not coincident with (x0,y0), line to.
        if (Math.abs(t01 - 1) > epsilon) {
          this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
        }

        this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
      }
    },
    arc: function(x, y, r, a0, a1, ccw) {
      x = +x, y = +y, r = +r, ccw = !!ccw;
      var dx = r * Math.cos(a0),
          dy = r * Math.sin(a0),
          x0 = x + dx,
          y0 = y + dy,
          cw = 1 ^ ccw,
          da = ccw ? a0 - a1 : a1 - a0;

      // Is the radius negative? Error.
      if (r < 0) throw new Error("negative radius: " + r);

      // Is this path empty? Move to (x0,y0).
      if (this._x1 === null) {
        this._ += "M" + x0 + "," + y0;
      }

      // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
      else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
        this._ += "L" + x0 + "," + y0;
      }

      // Is this arc empty? We’re done.
      if (!r) return;

      // Does the angle go the wrong way? Flip the direction.
      if (da < 0) da = da % tau + tau;

      // Is this a complete circle? Draw two arcs to complete the circle.
      if (da > tauEpsilon) {
        this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
      }

      // Is this arc non-empty? Draw an arc!
      else if (da > epsilon) {
        this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
      }
    },
    rect: function(x, y, w, h) {
      this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
    },
    toString: function() {
      return this._;
    }
  };

  function formatDecimal(x) {
    return Math.abs(x = Math.round(x)) >= 1e21
        ? x.toLocaleString("en").replace(/,/g, "")
        : x.toString(10);
  }

  // Computes the decimal coefficient and exponent of the specified number x with
  // significant digits p, where x is positive and p is in [1, 21] or undefined.
  // For example, formatDecimalParts(1.23) returns ["123", 0].
  function formatDecimalParts(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
    var i, coefficient = x.slice(0, i);

    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
    return [
      coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
      +x.slice(i + 1)
    ];
  }

  function exponent(x) {
    return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
  }

  function formatGroup(grouping, thousands) {
    return function(value, width) {
      var i = value.length,
          t = [],
          j = 0,
          g = grouping[0],
          length = 0;

      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width) break;
        g = grouping[j = (j + 1) % grouping.length];
      }

      return t.reverse().join(thousands);
    };
  }

  function formatNumerals(numerals) {
    return function(value) {
      return value.replace(/[0-9]/g, function(i) {
        return numerals[+i];
      });
    };
  }

  // [[fill]align][sign][symbol][0][width][,][.precision][~][type]
  var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

  function formatSpecifier(specifier) {
    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    return new FormatSpecifier({
      fill: match[1],
      align: match[2],
      sign: match[3],
      symbol: match[4],
      zero: match[5],
      width: match[6],
      comma: match[7],
      precision: match[8] && match[8].slice(1),
      trim: match[9],
      type: match[10]
    });
  }

  formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

  function FormatSpecifier(specifier) {
    this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
    this.align = specifier.align === undefined ? ">" : specifier.align + "";
    this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
    this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
    this.zero = !!specifier.zero;
    this.width = specifier.width === undefined ? undefined : +specifier.width;
    this.comma = !!specifier.comma;
    this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
    this.trim = !!specifier.trim;
    this.type = specifier.type === undefined ? "" : specifier.type + "";
  }

  FormatSpecifier.prototype.toString = function() {
    return this.fill
        + this.align
        + this.sign
        + this.symbol
        + (this.zero ? "0" : "")
        + (this.width === undefined ? "" : Math.max(1, this.width | 0))
        + (this.comma ? "," : "")
        + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
        + (this.trim ? "~" : "")
        + this.type;
  };

  // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
  function formatTrim(s) {
    out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s[i]) {
        case ".": i0 = i1 = i; break;
        case "0": if (i0 === 0) i0 = i; i1 = i; break;
        default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
      }
    }
    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
  }

  var prefixExponent;

  function formatPrefixAuto(x, p) {
    var d = formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1],
        i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
        n = coefficient.length;
    return i === n ? coefficient
        : i > n ? coefficient + new Array(i - n + 1).join("0")
        : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
        : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
  }

  function formatRounded(x, p) {
    var d = formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
        : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
        : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  }

  var formatTypes = {
    "%": (x, p) => (x * 100).toFixed(p),
    "b": (x) => Math.round(x).toString(2),
    "c": (x) => x + "",
    "d": formatDecimal,
    "e": (x, p) => x.toExponential(p),
    "f": (x, p) => x.toFixed(p),
    "g": (x, p) => x.toPrecision(p),
    "o": (x) => Math.round(x).toString(8),
    "p": (x, p) => formatRounded(x * 100, p),
    "r": formatRounded,
    "s": formatPrefixAuto,
    "X": (x) => Math.round(x).toString(16).toUpperCase(),
    "x": (x) => Math.round(x).toString(16)
  };

  function identity$2(x) {
    return x;
  }

  var map = Array.prototype.map,
      prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

  function formatLocale(locale) {
    var group = locale.grouping === undefined || locale.thousands === undefined ? identity$2 : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
        currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
        currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
        decimal = locale.decimal === undefined ? "." : locale.decimal + "",
        numerals = locale.numerals === undefined ? identity$2 : formatNumerals(map.call(locale.numerals, String)),
        percent = locale.percent === undefined ? "%" : locale.percent + "",
        minus = locale.minus === undefined ? "−" : locale.minus + "",
        nan = locale.nan === undefined ? "NaN" : locale.nan + "";

    function newFormat(specifier) {
      specifier = formatSpecifier(specifier);

      var fill = specifier.fill,
          align = specifier.align,
          sign = specifier.sign,
          symbol = specifier.symbol,
          zero = specifier.zero,
          width = specifier.width,
          comma = specifier.comma,
          precision = specifier.precision,
          trim = specifier.trim,
          type = specifier.type;

      // The "n" type is an alias for ",g".
      if (type === "n") comma = true, type = "g";

      // The "" type, and any invalid type, is an alias for ".12~g".
      else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

      // If zero fill is specified, padding goes after sign and before digits.
      if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

      // Compute the prefix and suffix.
      // For SI-prefix, the suffix is lazily computed.
      var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
          suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

      // What format function should we use?
      // Is this an integer type?
      // Can this type generate exponential notation?
      var formatType = formatTypes[type],
          maybeSuffix = /[defgprs%]/.test(type);

      // Set the default precision if not specified,
      // or clamp the specified precision to the supported range.
      // For significant precision, it must be in [1, 21].
      // For fixed precision, it must be in [0, 20].
      precision = precision === undefined ? 6
          : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
          : Math.max(0, Math.min(20, precision));

      function format(value) {
        var valuePrefix = prefix,
            valueSuffix = suffix,
            i, n, c;

        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value;

          // Determine the sign. -0 is not less than 0, but 1 / -0 is!
          var valueNegative = value < 0 || 1 / value < 0;

          // Perform the initial formatting.
          value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

          // Trim insignificant zeros.
          if (trim) value = formatTrim(value);

          // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
          if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

          // Compute the prefix and suffix.
          valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

          // Break the formatted value into the integer “value” part that can be
          // grouped, and fractional or exponential “suffix” part that is not.
          if (maybeSuffix) {
            i = -1, n = value.length;
            while (++i < n) {
              if (c = value.charCodeAt(i), 48 > c || c > 57) {
                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        }

        // If the fill character is not "0", grouping is applied before padding.
        if (comma && !zero) value = group(value, Infinity);

        // Compute the padding.
        var length = valuePrefix.length + value.length + valueSuffix.length,
            padding = length < width ? new Array(width - length + 1).join(fill) : "";

        // If the fill character is "0", grouping is applied after padding.
        if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

        // Reconstruct the final output based on the desired alignment.
        switch (align) {
          case "<": value = valuePrefix + value + valueSuffix + padding; break;
          case "=": value = valuePrefix + padding + value + valueSuffix; break;
          case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
          default: value = padding + valuePrefix + value + valueSuffix; break;
        }

        return numerals(value);
      }

      format.toString = function() {
        return specifier + "";
      };

      return format;
    }

    function formatPrefix(specifier, value) {
      var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
          e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
          k = Math.pow(10, -e),
          prefix = prefixes[8 + e / 3];
      return function(value) {
        return f(k * value) + prefix;
      };
    }

    return {
      format: newFormat,
      formatPrefix: formatPrefix
    };
  }

  var locale;
  var format;
  var formatPrefix;

  defaultLocale({
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });

  function defaultLocale(definition) {
    locale = formatLocale(definition);
    format = locale.format;
    formatPrefix = locale.formatPrefix;
    return locale;
  }

  function precisionFixed(step) {
    return Math.max(0, -exponent(Math.abs(step)));
  }

  function precisionPrefix(step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
  }

  function precisionRound(step, max) {
    step = Math.abs(step), max = Math.abs(max) - step;
    return Math.max(0, exponent(max) - exponent(step)) + 1;
  }

  function initRange(domain, range) {
    switch (arguments.length) {
      case 0: break;
      case 1: this.range(domain); break;
      default: this.range(range).domain(domain); break;
    }
    return this;
  }

  function constants(x) {
    return function() {
      return x;
    };
  }

  function number(x) {
    return +x;
  }

  var unit = [0, 1];

  function identity$1(x) {
    return x;
  }

  function normalize(a, b) {
    return (b -= (a = +a))
        ? function(x) { return (x - a) / b; }
        : constants(isNaN(b) ? NaN : 0.5);
  }

  function clamper(a, b) {
    var t;
    if (a > b) t = a, a = b, b = t;
    return function(x) { return Math.max(a, Math.min(b, x)); };
  }

  // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
  // interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
  function bimap(domain, range, interpolate) {
    var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
    if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
    else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
    return function(x) { return r0(d0(x)); };
  }

  function polymap(domain, range, interpolate) {
    var j = Math.min(domain.length, range.length) - 1,
        d = new Array(j),
        r = new Array(j),
        i = -1;

    // Reverse descending domains.
    if (domain[j] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }

    while (++i < j) {
      d[i] = normalize(domain[i], domain[i + 1]);
      r[i] = interpolate(range[i], range[i + 1]);
    }

    return function(x) {
      var i = bisectRight(domain, x, 1, j) - 1;
      return r[i](d[i](x));
    };
  }

  function copy(source, target) {
    return target
        .domain(source.domain())
        .range(source.range())
        .interpolate(source.interpolate())
        .clamp(source.clamp())
        .unknown(source.unknown());
  }

  function transformer() {
    var domain = unit,
        range = unit,
        interpolate = interpolate$1,
        transform,
        untransform,
        unknown,
        clamp = identity$1,
        piecewise,
        output,
        input;

    function rescale() {
      var n = Math.min(domain.length, range.length);
      if (clamp !== identity$1) clamp = clamper(domain[0], domain[n - 1]);
      piecewise = n > 2 ? polymap : bimap;
      output = input = null;
      return scale;
    }

    function scale(x) {
      return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
    }

    scale.invert = function(y) {
      return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
    };

    scale.domain = function(_) {
      return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
    };

    scale.range = function(_) {
      return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
    };

    scale.rangeRound = function(_) {
      return range = Array.from(_), interpolate = interpolateRound, rescale();
    };

    scale.clamp = function(_) {
      return arguments.length ? (clamp = _ ? true : identity$1, rescale()) : clamp !== identity$1;
    };

    scale.interpolate = function(_) {
      return arguments.length ? (interpolate = _, rescale()) : interpolate;
    };

    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    return function(t, u) {
      transform = t, untransform = u;
      return rescale();
    };
  }

  function continuous() {
    return transformer()(identity$1, identity$1);
  }

  function tickFormat(start, stop, count, specifier) {
    var step = tickStep(start, stop, count),
        precision;
    specifier = formatSpecifier(specifier == null ? ",f" : specifier);
    switch (specifier.type) {
      case "s": {
        var value = Math.max(Math.abs(start), Math.abs(stop));
        if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
        return formatPrefix(specifier, value);
      }
      case "":
      case "e":
      case "g":
      case "p":
      case "r": {
        if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
        break;
      }
      case "f":
      case "%": {
        if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
        break;
      }
    }
    return format(specifier);
  }

  function linearish(scale) {
    var domain = scale.domain;

    scale.ticks = function(count) {
      var d = domain();
      return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
    };

    scale.tickFormat = function(count, specifier) {
      var d = domain();
      return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
    };

    scale.nice = function(count) {
      if (count == null) count = 10;

      var d = domain();
      var i0 = 0;
      var i1 = d.length - 1;
      var start = d[i0];
      var stop = d[i1];
      var prestep;
      var step;
      var maxIter = 10;

      if (stop < start) {
        step = start, start = stop, stop = step;
        step = i0, i0 = i1, i1 = step;
      }
      
      while (maxIter-- > 0) {
        step = tickIncrement(start, stop, count);
        if (step === prestep) {
          d[i0] = start;
          d[i1] = stop;
          return domain(d);
        } else if (step > 0) {
          start = Math.floor(start / step) * step;
          stop = Math.ceil(stop / step) * step;
        } else if (step < 0) {
          start = Math.ceil(start * step) / step;
          stop = Math.floor(stop * step) / step;
        } else {
          break;
        }
        prestep = step;
      }

      return scale;
    };

    return scale;
  }

  function linear() {
    var scale = continuous();

    scale.copy = function() {
      return copy(scale, linear());
    };

    initRange.apply(scale, arguments);

    return linearish(scale);
  }

  function nice(domain, interval) {
    domain = domain.slice();

    var i0 = 0,
        i1 = domain.length - 1,
        x0 = domain[i0],
        x1 = domain[i1],
        t;

    if (x1 < x0) {
      t = i0, i0 = i1, i1 = t;
      t = x0, x0 = x1, x1 = t;
    }

    domain[i0] = interval.floor(x0);
    domain[i1] = interval.ceil(x1);
    return domain;
  }

  function transformLog(x) {
    return Math.log(x);
  }

  function transformExp(x) {
    return Math.exp(x);
  }

  function transformLogn(x) {
    return -Math.log(-x);
  }

  function transformExpn(x) {
    return -Math.exp(-x);
  }

  function pow10(x) {
    return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
  }

  function powp(base) {
    return base === 10 ? pow10
        : base === Math.E ? Math.exp
        : function(x) { return Math.pow(base, x); };
  }

  function logp(base) {
    return base === Math.E ? Math.log
        : base === 10 && Math.log10
        || base === 2 && Math.log2
        || (base = Math.log(base), function(x) { return Math.log(x) / base; });
  }

  function reflect(f) {
    return function(x) {
      return -f(-x);
    };
  }

  function loggish(transform) {
    var scale = transform(transformLog, transformExp),
        domain = scale.domain,
        base = 10,
        logs,
        pows;

    function rescale() {
      logs = logp(base), pows = powp(base);
      if (domain()[0] < 0) {
        logs = reflect(logs), pows = reflect(pows);
        transform(transformLogn, transformExpn);
      } else {
        transform(transformLog, transformExp);
      }
      return scale;
    }

    scale.base = function(_) {
      return arguments.length ? (base = +_, rescale()) : base;
    };

    scale.domain = function(_) {
      return arguments.length ? (domain(_), rescale()) : domain();
    };

    scale.ticks = function(count) {
      var d = domain(),
          u = d[0],
          v = d[d.length - 1],
          r;

      if (r = v < u) i = u, u = v, v = i;

      var i = logs(u),
          j = logs(v),
          p,
          k,
          t,
          n = count == null ? 10 : +count,
          z = [];

      if (!(base % 1) && j - i < n) {
        i = Math.floor(i), j = Math.ceil(j);
        if (u > 0) for (; i <= j; ++i) {
          for (k = 1, p = pows(i); k < base; ++k) {
            t = p * k;
            if (t < u) continue;
            if (t > v) break;
            z.push(t);
          }
        } else for (; i <= j; ++i) {
          for (k = base - 1, p = pows(i); k >= 1; --k) {
            t = p * k;
            if (t < u) continue;
            if (t > v) break;
            z.push(t);
          }
        }
        if (z.length * 2 < n) z = ticks(u, v, n);
      } else {
        z = ticks(i, j, Math.min(j - i, n)).map(pows);
      }

      return r ? z.reverse() : z;
    };

    scale.tickFormat = function(count, specifier) {
      if (specifier == null) specifier = base === 10 ? ".0e" : ",";
      if (typeof specifier !== "function") specifier = format(specifier);
      if (count === Infinity) return specifier;
      if (count == null) count = 10;
      var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
      return function(d) {
        var i = d / pows(Math.round(logs(d)));
        if (i * base < base - 0.5) i *= base;
        return i <= k ? specifier(d) : "";
      };
    };

    scale.nice = function() {
      return domain(nice(domain(), {
        floor: function(x) { return pows(Math.floor(logs(x))); },
        ceil: function(x) { return pows(Math.ceil(logs(x))); }
      }));
    };

    return scale;
  }

  function log() {
    var scale = loggish(transformer()).domain([1, 10]);

    scale.copy = function() {
      return copy(scale, log()).base(scale.base());
    };

    initRange.apply(scale, arguments);

    return scale;
  }

  var constant = x => () => x;

  function ZoomEvent(type, {
    sourceEvent,
    target,
    transform,
    dispatch
  }) {
    Object.defineProperties(this, {
      type: {value: type, enumerable: true, configurable: true},
      sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
      target: {value: target, enumerable: true, configurable: true},
      transform: {value: transform, enumerable: true, configurable: true},
      _: {value: dispatch}
    });
  }

  function Transform(k, x, y) {
    this.k = k;
    this.x = x;
    this.y = y;
  }

  Transform.prototype = {
    constructor: Transform,
    scale: function(k) {
      return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
    },
    translate: function(x, y) {
      return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
    },
    apply: function(point) {
      return [point[0] * this.k + this.x, point[1] * this.k + this.y];
    },
    applyX: function(x) {
      return x * this.k + this.x;
    },
    applyY: function(y) {
      return y * this.k + this.y;
    },
    invert: function(location) {
      return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
    },
    invertX: function(x) {
      return (x - this.x) / this.k;
    },
    invertY: function(y) {
      return (y - this.y) / this.k;
    },
    rescaleX: function(x) {
      return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
    },
    rescaleY: function(y) {
      return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
    },
    toString: function() {
      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    }
  };

  var identity = new Transform(1, 0, 0);

  function nopropagation(event) {
    event.stopImmediatePropagation();
  }

  function noevent(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  // Ignore right-click, since that should open the context menu.
  // except for pinch-to-zoom, which is sent as a wheel+ctrlKey event
  function defaultFilter(event) {
    return (!event.ctrlKey || event.type === 'wheel') && !event.button;
  }

  function defaultExtent() {
    var e = this;
    if (e instanceof SVGElement) {
      e = e.ownerSVGElement || e;
      if (e.hasAttribute("viewBox")) {
        e = e.viewBox.baseVal;
        return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
      }
      return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
    }
    return [[0, 0], [e.clientWidth, e.clientHeight]];
  }

  function defaultTransform() {
    return this.__zoom || identity;
  }

  function defaultWheelDelta(event) {
    return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
  }

  function defaultTouchable() {
    return navigator.maxTouchPoints || ("ontouchstart" in this);
  }

  function defaultConstrain(transform, extent, translateExtent) {
    var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
        dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
        dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
        dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
    return transform.translate(
      dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
      dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
    );
  }

  function zoom() {
    var filter = defaultFilter,
        extent = defaultExtent,
        constrain = defaultConstrain,
        wheelDelta = defaultWheelDelta,
        touchable = defaultTouchable,
        scaleExtent = [0, Infinity],
        translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
        duration = 250,
        interpolate = interpolateZoom,
        listeners = dispatch("start", "zoom", "end"),
        touchstarting,
        touchfirst,
        touchending,
        touchDelay = 500,
        wheelDelay = 150,
        clickDistance2 = 0,
        tapDistance = 10;

    function zoom(selection) {
      selection
          .property("__zoom", defaultTransform)
          .on("wheel.zoom", wheeled)
          .on("mousedown.zoom", mousedowned)
          .on("dblclick.zoom", dblclicked)
        .filter(touchable)
          .on("touchstart.zoom", touchstarted)
          .on("touchmove.zoom", touchmoved)
          .on("touchend.zoom touchcancel.zoom", touchended)
          .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }

    zoom.transform = function(collection, transform, point, event) {
      var selection = collection.selection ? collection.selection() : collection;
      selection.property("__zoom", defaultTransform);
      if (collection !== selection) {
        schedule(collection, transform, point, event);
      } else {
        selection.interrupt().each(function() {
          gesture(this, arguments)
            .event(event)
            .start()
            .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
            .end();
        });
      }
    };

    zoom.scaleBy = function(selection, k, p, event) {
      zoom.scaleTo(selection, function() {
        var k0 = this.__zoom.k,
            k1 = typeof k === "function" ? k.apply(this, arguments) : k;
        return k0 * k1;
      }, p, event);
    };

    zoom.scaleTo = function(selection, k, p, event) {
      zoom.transform(selection, function() {
        var e = extent.apply(this, arguments),
            t0 = this.__zoom,
            p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
            p1 = t0.invert(p0),
            k1 = typeof k === "function" ? k.apply(this, arguments) : k;
        return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
      }, p, event);
    };

    zoom.translateBy = function(selection, x, y, event) {
      zoom.transform(selection, function() {
        return constrain(this.__zoom.translate(
          typeof x === "function" ? x.apply(this, arguments) : x,
          typeof y === "function" ? y.apply(this, arguments) : y
        ), extent.apply(this, arguments), translateExtent);
      }, null, event);
    };

    zoom.translateTo = function(selection, x, y, p, event) {
      zoom.transform(selection, function() {
        var e = extent.apply(this, arguments),
            t = this.__zoom,
            p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
        return constrain(identity.translate(p0[0], p0[1]).scale(t.k).translate(
          typeof x === "function" ? -x.apply(this, arguments) : -x,
          typeof y === "function" ? -y.apply(this, arguments) : -y
        ), e, translateExtent);
      }, p, event);
    };

    function scale(transform, k) {
      k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
      return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
    }

    function translate(transform, p0, p1) {
      var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
      return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
    }

    function centroid(extent) {
      return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
    }

    function schedule(transition, transform, point, event) {
      transition
          .on("start.zoom", function() { gesture(this, arguments).event(event).start(); })
          .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).event(event).end(); })
          .tween("zoom", function() {
            var that = this,
                args = arguments,
                g = gesture(that, args).event(event),
                e = extent.apply(that, args),
                p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point,
                w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
                a = that.__zoom,
                b = typeof transform === "function" ? transform.apply(that, args) : transform,
                i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
            return function(t) {
              if (t === 1) t = b; // Avoid rounding error on end.
              else { var l = i(t), k = w / l[2]; t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
              g.zoom(null, t);
            };
          });
    }

    function gesture(that, args, clean) {
      return (!clean && that.__zooming) || new Gesture(that, args);
    }

    function Gesture(that, args) {
      this.that = that;
      this.args = args;
      this.active = 0;
      this.sourceEvent = null;
      this.extent = extent.apply(that, args);
      this.taps = 0;
    }

    Gesture.prototype = {
      event: function(event) {
        if (event) this.sourceEvent = event;
        return this;
      },
      start: function() {
        if (++this.active === 1) {
          this.that.__zooming = this;
          this.emit("start");
        }
        return this;
      },
      zoom: function(key, transform) {
        if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
        if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
        if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
        this.that.__zoom = transform;
        this.emit("zoom");
        return this;
      },
      end: function() {
        if (--this.active === 0) {
          delete this.that.__zooming;
          this.emit("end");
        }
        return this;
      },
      emit: function(type) {
        var d = select(this.that).datum();
        listeners.call(
          type,
          this.that,
          new ZoomEvent(type, {
            sourceEvent: this.sourceEvent,
            target: zoom,
            type,
            transform: this.that.__zoom,
            dispatch: listeners
          }),
          d
        );
      }
    };

    function wheeled(event, ...args) {
      if (!filter.apply(this, arguments)) return;
      var g = gesture(this, args).event(event),
          t = this.__zoom,
          k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
          p = pointer(event);

      // If the mouse is in the same location as before, reuse it.
      // If there were recent wheel events, reset the wheel idle timeout.
      if (g.wheel) {
        if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
          g.mouse[1] = t.invert(g.mouse[0] = p);
        }
        clearTimeout(g.wheel);
      }

      // If this wheel event won’t trigger a transform change, ignore it.
      else if (t.k === k) return;

      // Otherwise, capture the mouse point and location at the start.
      else {
        g.mouse = [p, t.invert(p)];
        interrupt(this);
        g.start();
      }

      noevent(event);
      g.wheel = setTimeout(wheelidled, wheelDelay);
      g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

      function wheelidled() {
        g.wheel = null;
        g.end();
      }
    }

    function mousedowned(event, ...args) {
      if (touchending || !filter.apply(this, arguments)) return;
      var g = gesture(this, args, true).event(event),
          v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
          p = pointer(event, currentTarget),
          currentTarget = event.currentTarget,
          x0 = event.clientX,
          y0 = event.clientY;

      dragDisable(event.view);
      nopropagation(event);
      g.mouse = [p, this.__zoom.invert(p)];
      interrupt(this);
      g.start();

      function mousemoved(event) {
        noevent(event);
        if (!g.moved) {
          var dx = event.clientX - x0, dy = event.clientY - y0;
          g.moved = dx * dx + dy * dy > clickDistance2;
        }
        g.event(event)
         .zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
      }

      function mouseupped(event) {
        v.on("mousemove.zoom mouseup.zoom", null);
        yesdrag(event.view, g.moved);
        noevent(event);
        g.event(event).end();
      }
    }

    function dblclicked(event, ...args) {
      if (!filter.apply(this, arguments)) return;
      var t0 = this.__zoom,
          p0 = pointer(event.changedTouches ? event.changedTouches[0] : event, this),
          p1 = t0.invert(p0),
          k1 = t0.k * (event.shiftKey ? 0.5 : 2),
          t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);

      noevent(event);
      if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0, event);
      else select(this).call(zoom.transform, t1, p0, event);
    }

    function touchstarted(event, ...args) {
      if (!filter.apply(this, arguments)) return;
      var touches = event.touches,
          n = touches.length,
          g = gesture(this, args, event.changedTouches.length === n).event(event),
          started, i, t, p;

      nopropagation(event);
      for (i = 0; i < n; ++i) {
        t = touches[i], p = pointer(t, this);
        p = [p, this.__zoom.invert(p), t.identifier];
        if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
        else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
      }

      if (touchstarting) touchstarting = clearTimeout(touchstarting);

      if (started) {
        if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
        interrupt(this);
        g.start();
      }
    }

    function touchmoved(event, ...args) {
      if (!this.__zooming) return;
      var g = gesture(this, args).event(event),
          touches = event.changedTouches,
          n = touches.length, i, t, p, l;

      noevent(event);
      for (i = 0; i < n; ++i) {
        t = touches[i], p = pointer(t, this);
        if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
        else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
      }
      t = g.that.__zoom;
      if (g.touch1) {
        var p0 = g.touch0[0], l0 = g.touch0[1],
            p1 = g.touch1[0], l1 = g.touch1[1],
            dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
            dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
        t = scale(t, Math.sqrt(dp / dl));
        p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
        l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
      }
      else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
      else return;

      g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
    }

    function touchended(event, ...args) {
      if (!this.__zooming) return;
      var g = gesture(this, args).event(event),
          touches = event.changedTouches,
          n = touches.length, i, t;

      nopropagation(event);
      if (touchending) clearTimeout(touchending);
      touchending = setTimeout(function() { touchending = null; }, touchDelay);
      for (i = 0; i < n; ++i) {
        t = touches[i];
        if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
        else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
      }
      if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
      if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else {
        g.end();
        // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
        if (g.taps === 2) {
          t = pointer(t, this);
          if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
            var p = select(this).on("dblclick.zoom");
            if (p) p.apply(this, arguments);
          }
        }
      }
    }

    zoom.wheelDelta = function(_) {
      return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant(+_), zoom) : wheelDelta;
    };

    zoom.filter = function(_) {
      return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), zoom) : filter;
    };

    zoom.touchable = function(_) {
      return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom) : touchable;
    };

    zoom.extent = function(_) {
      return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
    };

    zoom.scaleExtent = function(_) {
      return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
    };

    zoom.translateExtent = function(_) {
      return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
    };

    zoom.constrain = function(_) {
      return arguments.length ? (constrain = _, zoom) : constrain;
    };

    zoom.duration = function(_) {
      return arguments.length ? (duration = +_, zoom) : duration;
    };

    zoom.interpolate = function(_) {
      return arguments.length ? (interpolate = _, zoom) : interpolate;
    };

    zoom.on = function() {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? zoom : value;
    };

    zoom.clickDistance = function(_) {
      return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
    };

    zoom.tapDistance = function(_) {
      return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
    };

    return zoom;
  }

  var css = {
    card: "\n\t  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n\t  position: relative;\n\t  left: 50px;\n\t  top: 0px;\n\t  display: inline-block;\n\t",
    cardHeader: "\n\t  width: 100%;\n\t  background-color: white;\n\t  display: inline-block;\n\t",
    plotTitle: "\n\t  width: 80%;\n      overflow: hidden; \n      white-space: nowrap; \n      text-overflow: ellipsis;\n\t  display: inline-block;\n\t  cursor: text;\n\t  margin: 8px 0px 0px 4px;\n\t  font-weight: bold;\n\t  font-size: 16px;\n\t  border: none;\n\t",
    // Buttons
    btn: "\n\t  border: none;\n\t  border-radius: 12px;\n\t  text-align: center;\n\t  text-decoration: none;\n\t  display: inline-block;\n\t  font-size: 20px;\n\t  margin: 4px 2px;\n\t  cursor: pointer;\n    ",
    btnSubmit: "\n\t  background-color: mediumSeaGreen; \n\t  color: white;\n    ",
    btnDanger: "\n\t  background-color: crimson;\n\t  color: white;\n\t  float: right;\n    "
  }; // css

  var template$a = "\n\t<div style=\"".concat(css.card, "\">\n\t\t<div class=\"card-header\" style=\"").concat(css.cardHeader, "\">\n\t\t\t<input class=\"card-title\" spellcheck=\"false\"  style=\"").concat(css.plotTitle, "\" value=\"New Plot\">\n\t\t</div>\n\t\t\n\t\t<div class=\"card-body\">\n\t\t\n\t\t</div>\n\t</div>\n"); // template

  var plotframe = function plotframe() {
    _classCallCheck(this, plotframe);

    var obj = this;
    obj.node = html2element(template$a);
  } // constructor	
  ;
   // plotframe

  var variablemenustyle = "\n  background-color: white;\n  border: 2px solid black;\n  border-radius: 5px;\n  display: none; \n  position: absolute;\n  max-height: 120px;\n  overflow-y: auto;\n";
  var ulstyle = "\n  list-style-type: none;\n  font-size: 10px;\n  font-weight: bold;\n  padding-left: 4px;\n  padding-right: 4px;\n";
  var template$9 = "\n<div class=\"variable-select-menu\" style=\"".concat(variablemenustyle, "\">\n  <ul style=\"").concat(ulstyle, "\">\n  </ul>\n</div>\n"); // Differentite between an x and a y one.

  var divSelectMenu = /*#__PURE__*/function () {
    function divSelectMenu(axis) {
      _classCallCheck(this, divSelectMenu);

      this.variables = [];
      this.current = {
        name: undefined,
        extent: [1, 1]
      };
      var obj = this;
      obj.node = html2element(template$9);

      obj.node.onclick = function (event) {
        return event.stopPropagation();
      };
    } // constructor


    _createClass(divSelectMenu, [{
      key: "update",
      value: function update() {
        var obj = this; // First remove all li.

        var ul = obj.node.querySelector("ul");

        while (ul.lastChild) {
          ul.removeChild(ul.lastChild);
        } // while
        // Now add in the needed li objects.


        obj.variables.forEach(function (variable) {
          var t = "<li class=\"hover-highlight\">".concat(variable.name, "</li>");
          var li = html2element(t);
          ul.appendChild(li);
          li.addEventListener("click", function (event) {
            // If event propagation is stopped here then additional functionality can't be attached to the menu.
            obj.current = variable;
            obj.hide();
            obj.onselection();
          });
        });
      } // update

    }, {
      key: "show",
      value: function show() {
        var obj = this;
        obj.node.style.display = "inline-block";
      } // show

    }, {
      key: "hide",
      value: function hide() {
        var obj = this;
        obj.node.style.display = "none";
      } // hide

    }, {
      key: "onselection",
      value: function onselection() {// dummy placeholder
      }
    }]);

    return divSelectMenu;
  }(); // divSelectMenu

  /* I want to support:
   - linear		: scaleLinear
   - logarithmic	: scaleLog - must not cross 0!!
   
   And variable types:
   - number       : can be used as is.
   - datetime		: scaleTime() 
  		.domain([new Date(2000, 0, 1), new Date(2000, 0, 2)])
  		.range([0, 960]);
  scales
  */

  var textattributes$1 = "fill=\"black\" font-size=\"10px\" font-weight=\"bold\"";
  var exponenttemplate$1 = "\n<text class=\"linear\" ".concat(textattributes$1, ">\n\t<tspan>\n\t  x10\n\t  <tspan class=\"exp\" dy=\"-5\"></tspan>\n\t</tspan>\n</text>\n");
  var logtemplate$1 = "\n<text class=\"log\" ".concat(textattributes$1, " display=\"none\">\n\t<tspan>\n\t  log\n\t  <tspan class=\"base\" dy=\"5\">10</tspan>\n\t  <tspan class=\"eval\" dy=\"-5\">(x)</tspan>\n\t</tspan>\n</text>\n"); // text -> x="-8" / y="-0.32em"

  var template$8 = "\n\t<g class=\"graphic\"></g>\n\t\n\t<g class=\"model-controls\" style=\"cursor: pointer;\">\n\t\t".concat(exponenttemplate$1, "\n\t\t").concat(logtemplate$1, "\n\t</g>\n\t<g class=\"domain-controls\" style=\"cursor: pointer;\">\n\t\t<text class=\"plus hover-highlight\" ").concat(textattributes$1, ">+</text>\n\t\t<text class=\"minus hover-highlight\" ").concat(textattributes$1, ">-</text>\n\t</g>\n\t<g class=\"variable-controls\" style=\"cursor: pointer;\">\n\t\t<text class=\"label hover-highlight\" ").concat(textattributes$1, " text-anchor=\"end\">Variable name</text>\n\t</g>\n"); // The exponent should be replaced with the logarithmic controls if the axis switches from linear to log.
  // Now I need to add in a label saying linear/log
  // DONE!! Maybe a plus/minus next to the axes to increase the axis limits - instead of dragging the labels.
  // The changing between the variables is done in the parent, and not in the axis. This is simply because this class only controls it's own node, and there isn't space to show all the options. Therefore the parent must allocate the space for the change of variables.
  // How to change between the scale interpretations? What should I click? Maybe the exponent text? But then it should always be visible. Let's try that yes. But how to differentiate between clicking on hte text, and editing the text??

  var ordinalAxis = /*#__PURE__*/function () {
    // These margins are required to completely fit the scales along with their labels, ticks and domain lines onto the plot.
    function ordinalAxis(axis, plotbox) {
      _classCallCheck(this, ordinalAxis);

      this._type = "linear";
      this._variable = {
        name: undefined,
        extent: [1, 1]
      };
      this.domain = [1, 1];
      this.supportedtypes = ["linear", "log"];
      this.margin = {
        top: 30,
        right: 30,
        bottom: 40,
        left: 40
      };
      /* `axis' is a flag that signals whether it should be a vertical or horizontal axis, `svgbbox' allows the axis to be appropriately positioned, and therefore define the plotting area, and `ordinalvariable' is a dbslice ordinal variable which is paired with this axis. */

      var obj = this; // make the axis group.

      obj.d3node = create$1("svg:g").attr("class", "".concat(axis, "-axis")).html(template$8);
      obj.node = obj.d3node.node(); // Get rid of axis by abstracting?

      obj.axis = axis;
      obj.setplotbox(plotbox); // Add the functionality to the domain change.

      var controls = obj.d3node.select("g.domain-controls");
      controls.select("text.plus").on("click", function () {
        obj.plusdomain();
        obj.update();
      });
      controls.select("text.minus").on("click", function () {
        obj.minusdomain();
        obj.update();
      }); // Add teh functionality to toggle the axis type.

      var exponent = obj.d3node.select("g.model-controls");
      exponent.on("click", function () {
        obj.incrementtype();
        obj.update();
      }); // Add the menu that will be associated with this axis.

      obj.menu = new divSelectMenu();

      if (axis == "y") {
        obj.menu.node.style.left = "5px";
        obj.menu.node.style.top = "10px";
      } else {
        obj.menu.node.style.right = "10px";
        obj.menu.node.style.bottom = "10px";
      }

      var menuToggle = obj.node.querySelector("g.variable-controls").querySelector("text.label");
      menuToggle.addEventListener("click", function (event) {
        event.stopPropagation();
        obj.menu.show();
      });

      obj.menu.onselection = function () {
        obj.variable = obj.menu.current;
        obj.update();
      }; // onselection

    } // constructor


    _createClass(ordinalAxis, [{
      key: "update",
      value: function update(variables) {
        var obj = this;

        if (variables) {
          obj.menu.variables = variables;
          obj.menu.update();
          obj.variable = obj.menu.current;
        } // if


        obj.position();
        obj.draw();
        obj.onupdate();
      } // update

    }, {
      key: "onupdate",
      value: function onupdate() {// dummy function.
      } // I want to be able to set the variable from outside, and have the axis refresh itself accordingly. `variable' was made a computed because mobx then treats the setter as an acion, and the getter as a computed.

    }, {
      key: "variable",
      get: // variable
      function get() {
        // The the get variable can be a computed, and the variable will be observable anyway.
        // Why doesn't this one compute correctly??
        // console.log(`compute variable for ${this.axis} axis`)
        return this._variable;
      } // variable
      // Drawing of the svg axes.
      ,
      set: function set(variable) {
        // Set a new variable for the axis.
        var obj = this; // Change the domain. Before setting the initial domain extend it by 10% on either side to make sure the data fits neatly inside.

        var domaindiff = 0 * (variable.extent[1] - variable.extent[0]);
        obj.setdomain([variable.extent[0] - 0.1 * domaindiff, variable.extent[1] + 0.1 * domaindiff]); // Change the axis type to the variables.

        obj.type = variable.axistype; // Need to store it under an anonymous name so it doesn't recursively call this function.

        obj._variable = variable;
      }
    }, {
      key: "position",
      value: function position() {
        // If the range changes, then the location of the axes must change also. And with them the exponents should change location.
        var obj = this; // Position the axis. This will impact all of the following groups that are within the axes group.

        var ax = obj.axis == "y" ? obj.margin.left : 0;
        var ay = obj.axis == "y" ? 0 : obj.plotbox.y[1] - obj.margin.bottom;
        obj.d3node.attr("transform", "translate(".concat(ax, ", ").concat(ay, ")")); // Reposition hte exponent.

        var model = obj.d3node.select("g.model-controls");
        model.attr("text-anchor", obj.axis == "y" ? "start" : "end");
        var mx = obj.axis == "y" ? 0 + 6 : obj.range[1];
        var my = obj.axis == "y" ? obj.margin.top + 3 : 0 - 6;
        model.attr("transform", "translate(".concat(mx, ", ").concat(my, ")")); // Reposition the +/- controls.

        var controls = obj.d3node.select("g.domain-controls");
        var cx = obj.axis == "y" ? 0 - 5 : obj.range[1] + 10;
        var cy = obj.axis == "y" ? obj.margin.top - 10 : 0 + 5;
        controls.attr("transform", "translate(".concat(cx, ", ").concat(cy, ")")); // Reposition hte actual plus/minus.

        var dyPlus = obj.axis == "y" ? 0 : -5;
        var dxPlus = obj.axis == "y" ? -5 : 0;
        var dyMinus = obj.axis == "y" ? 0 : 5;
        var dxMinus = obj.axis == "y" ? 5 : 1.5;
        controls.select("text.plus").attr("dy", dyPlus);
        controls.select("text.plus").attr("dx", dxPlus);
        controls.select("text.minus").attr("dy", dyMinus);
        controls.select("text.minus").attr("dx", dxMinus); // Position the variable label.

        var labelgroup = obj.d3node.select("g.variable-controls");
        var label = labelgroup.select("text.label"); // The text should be flush with the axis. To allow easier positioning use the `text-anchor' property.

        label.attr("writing-mode", obj.axis == "y" ? "tb" : "lr");
        label.text(obj.variable.name ? obj.variable.name : "Variable name");
        var lx = obj.axis == "y" ? 30 : obj.range[1];
        var ly = obj.axis == "y" ? -obj.margin.top : 30;
        var la = obj.axis == "y" ? 180 : 0;
        labelgroup.attr("transform", "rotate(".concat(la, ") translate(").concat(lx, ", ").concat(ly, ")"));
      } // position

    }, {
      key: "draw",
      value: function draw() {
        var obj = this;
        obj.d3node.selectAll("g.model-controls").select("text").attr("fill", obj.exponent > 0 ? "black" : "black").select("tspan.exp").html(obj.exponent); // A different scale is created for drawing to allow specific labels to be created (e.g. for scientific notation with the exponent above the axis.)	

        var d3axis = obj.axis == "y" ? axisLeft : axisBottom;
        obj.d3node.select("g.graphic").call(d3axis(obj.scale)); // Control the ticks. Mak

        obj.d3node.select("g.graphic").selectAll("text").html(function (d) {
          return obj.tickformat(d);
        }); // Switch between the model controls.

        var modelcontrols = obj.d3node.select("g.model-controls");
        modelcontrols.selectAll("text").attr("display", "none");
        modelcontrols.select("text." + obj.type).attr("display", "");
      } // draw
      // MOVE ALL THESE SWITCHES SOMEWHERE ELSE. MAYBE JUST CREATE A SUPPORTED OBJECT OUTSIDE SO ALL THE SMALL CHANGES CAN BE HANDLED THERE.

    }, {
      key: "tickformat",
      value: function tickformat(d) {
        // By default the tick values are assigned to all tick marks. Just control what appears in hte labels.
        var obj = this;
        var label;

        switch (obj.type) {
          case "log":
            // Only orders of magnitude. Keep an eye out for number precision when dividing logarithms!
            var res = Math.round(Math.log(d) / Math.log(obj.scale.base()) * 1e6) / 1e6; // Counting ticks doesn't work, because the ticks don't necessarily begin with the order of magnitude tick.

            label = Number.isInteger(res) ? d : "";
            break;

          case "linear":
            // All of them, but adjusted by the common exponent. 
            label = d / Math.pow(10, obj.exponent);
            break;
        } // switch


        return label;
      } // tickformat

    }, {
      key: "getdrawvalue",
      value: function getdrawvalue(t) {
        // Given a task return its coordinate.
        // This is just implemented for more strict control of wht this axis can do. It's not strictly needed because the scale underneath is not being changed.
        // Needs the current object as it evaluates the incoming value using the current scale.
        var obj = this;
        var v = obj.variable.getvalue(t); // Return only the value of the current axis selection. Also, if the data doesn't have the appropriate attribute, then position hte point off screen instead of returning undefined. Will this break if viewPort is adjusted?

        var dv = obj.scale(v);
        return dv ? dv : -10;
      } // getdrawvalue
      // Getting values required to setup the scales.

    }, {
      key: "scale",
      get: function get() {
        // Computed value based on hte selected scale type.
        var obj = this;
        var scale;

        switch (obj.type) {
          case "log":
            scale = log();
            break;

          case "linear":
          default:
            scale = linear();
            break;
        } // switch
        // If the domain is below zero always Math.abs it to work with positive values.
        // The domain of this one  goes below zero... It's because the domain was extended there!! Ah, will this break the zooming and panning below zero?? Probably no? Logs aren't defined for negtive values anyway? So what do I do in those cases? Do I just add a translation in the data? For now just
        // Deal with the exponent. Will this require accessor functions?? This means that there should be another
        // I will want the axis configuration to be stored and communicated further to pass into a python module. How will I do that? For that I'll need to evaluate teh data passed into the module. So I should use an evaluator anyway. Where should this evaluator be present? It should be present in the plot. The axis should return the parameters required for the evaluation. But it also needs to return the scale to be used for drawing. Actually, it just needs to present the draw value given some input. So just have that exposed? And a general evaluator that can handle any combination of inputs?


        scale.range(obj.range).domain(obj.domain);
        return scale;
      } // get scale

    }, {
      key: "range",
      get: function get() {
        // When initialising a new range - e.g. on plot rescaling, the scales need to change
        var obj = this; // When the axis is made the first tick is translated by the minimum of the range. Therefore the margin is only added when adjusting the `_range`. 

        if (obj.axis == "y") {
          // The browsers coordinate system runs from top of page to bottom. This is opposite from what we're used to in engineering charts. Reverse the range for hte desired change.
          var r = [obj.plotbox.y[0] + obj.margin.top, obj.plotbox.y[1] - obj.margin.bottom];
          return [r[1], r[0]];
        } else {
          return [obj.plotbox.x[0] + obj.margin.left, obj.plotbox.x[1] - obj.margin.right];
        } // if

      } // get range

    }, {
      key: "setplotbox",
      value: function setplotbox(plotbox) {
        // The vertical position of the axis doesn't actually depend on the range. The y-position for the x axis should be communicated from outside. The axis should always get the x and y dimesnion of the svg we're placing it on.
        this.plotbox = plotbox;
      } // plotbox
      // Domain changes

    }, {
      key: "setdomain",
      value: function setdomain(domain) {
        this.domain = domain;
      } // domain

    }, {
      key: "plusdomain",
      value: function plusdomain() {
        // Extend the domain by one difference between the existing ticks. It's always extended by hte distance between the last two ticks.
        var obj = this;
        var currentdomain = obj.domain;
        var ticks = obj.scale.ticks(); // Calculate the tick difference. If that fails just set the difference to 10% of the domain range.

        var tickdiff = ticks[ticks.length - 1] - ticks[ticks.length - 2];
        tickdiff = tickdiff ? tickdiff : 0.1(currentdomain[1] - currentdomain[0]); // Set the new domain.

        this.domain = [currentdomain[0], currentdomain[1] + tickdiff];
      } // plusdomain

    }, {
      key: "minusdomain",
      value: function minusdomain() {
        // Reduce the domain by one difference between the existing ticks. It's always extended by hte distance between the last two ticks.
        var obj = this;
        var currentdomain = obj.domain;
        var ticks = obj.scale.ticks(); // Calculate the tick difference. If that fails just set the difference to 10% of the domain range.

        var tickdiff = ticks[ticks.length - 1] - ticks[ticks.length - 2];
        tickdiff = tickdiff ? tickdiff : 0.1(currentdomain[1] - currentdomain[0]); // Set the new domain.

        this.domain = [currentdomain[0], currentdomain[1] - tickdiff];
      } // minusdomain
      // Creating model variables.
      // This exponent should be reworked to just return the transformation configuration.
      // Difference between the tick labels, and the data for evaluation. For the evaluation whatever is displayed on hte axes should be passed to the model. But the exponent is just a cosmetic change.
      // Can also use the exponent to guess what space we should be viewing the data in? Maybe not. For example erroneous values.
      // Difference between a log scale transformation and a log scale axis. The log axis still shows the exact same values, whereas the transform will create new values. Do I want to differentiate between the two, or just apply a log transformation if the data is visualised with a log scale? Even if the data is in hte log scale the user may still want to use it as such?
      // Still connect both - what you see is what you get. But on hte log plot maybe still keep the original labels?? Let's see how it goes.
      // So if I have an exponent do I change the domain? But the exponent depends on the domain...Create a labelaxis just to draw the labels??

    }, {
      key: "exponent",
      get: function get() {
        var obj = this;

        if (obj.domain.length > 0) {
          var maxExp = calculateExponent(obj.domain[1]);
          var minExp = calculateExponent(obj.domain[0]); // Which exponent to return? It has to be a multiple of three - guaranteed by calculateExponent.
          // -10.000 - 10.000 -> 3
          // 0 - 10.000 -> 3
          // 0 - 1.000.000 -> 3 - to minimize string length?
          // 
          // If the order of magnitude is a factor of 3 then return the maximum one. e.g. range of 100 - 100.000 go for 3 to reduce teh string length

          return maxExp - minExp >= 3 ? maxExp : minExp;
        } else {
          return 0;
        } // if

      } // exponent
      // Changing the scale type. Click on the exponent to change the 

    }, {
      key: "nexttype",
      value: function nexttype(type) {
        // Sequence of axis types.
        var obj = this;
        var imax = obj.supportedtypes.length - 1;
        var inext = obj.supportedtypes.indexOf(type) + 1;
        var i = inext > imax ? inext - imax - 1 : inext;
        return obj.supportedtypes[i];
      } // nexttype
      // Shouldn't really migrate the type of axes from the ordinalAxes to the variable. What if teh variable isn't observable for instance? In that case use an observable attribute of this class.

    }, {
      key: "incrementtype",
      value: function incrementtype() {
        var obj = this;
        var newtype = obj.nexttype(obj.type); // If the switch is to `log' the domain needs to be changed to be positive. So: don't allow the change to log. If the user wants to use a log transformation on the data they need to first et it in the right range.

        if (newtype == "log") {
          var extent = obj.variable.extent;
          var invalidExtent = extent[0] * extent[1] <= 0;

          if (invalidExtent) {
            // Move to next type.
            newtype = obj.nexttype(newtype);
          } // if

        } // if
        // Set the new type.


        obj.type = newtype; // Try to increment it for the variable obj too.

        if (typeof obj.variable.changetransformtype == "function") {
          obj.variable.changetransformtype(newtype);
        } // if
        // Always switch back to the original domain.


        if (obj.variable) {
          obj.setdomain(obj.variable.extent);
        } // if

      } // incrementtype

    }, {
      key: "type",
      get: // type
      function get() {
        // Maybe adjust this one so that it gets the type from the variable, if it's available.
        var obj = this; // Default value.

        var _type = obj._type; // But if the variable is defined, and it has a correctly defined type, then use that one instead. If it's observable this will also update automatically.

        if (obj.variable) {
          var customtype = obj.variable.transformtype;

          if (obj.supportedtypes.includes(customtype)) {
            _type = customtype;
          } // if

        }

        return _type;
      } // type
      ,
      set: function set(newtype) {
        var obj = this; // The type can be set to a specific value.

        if (obj.supportedtypes.includes(newtype)) {
          obj._type = newtype;
        } // if

      }
    }]);

    return ordinalAxis;
  }(); // axis

  /*
  background: elements for background functionality (e.g. zoom rectangle)
  data      : primary data representations
  markup    : non-primary data graphic markups, (e.g. compressor map chics) 
  x/y-axis  : x/y axis elements
  exponent  : power exponent (big number labels may overlap otherwise)
  */

  var template$7 = "\n<div style=\"position: relative;\">\n\t<svg class=\"plot-area\" width=\"400\" height=\"400\">\n\t\t\n\t\t<g class=\"background\">\n\t\t\t\n\t\t\t<rect class=\"zoom-area\" fill=\"rgb(255, 255, 255)\" width=\"400\" height=\"400\"></rect>\n\t\t\t\n\t\t\t<g class=\"tooltip-anchor\">\n\t\t\t\t<circle class=\"anchor-point\" r=\"1\" opacity=\"0\"></circle>\n\t\t\t</g>\n\t\t</g>\n\t\t\n\t\t\n\t\t<g class=\"datum\"></g>\n\t\t<g class=\"data\"></g>\n\t\t<g class=\"markup\"></g>\n\t\t<g class=\"axes\"></g>\n\t\t\n\t\t\n\t</svg>\n\t\n\t<div class=\"variable-select-menus\"></div>\n\t\n</div>\n"; // The axis scale needs to have access to the data and to the svg dimensions. Actually not access to the data, but access to the data extent. This has been solved by adding calculated extents to the variable objects.
  // It's best to just pass all the variables to the axis, and let it handle everything connected to it. 
  // This class is a template for two interactive axes svg based plotting.
  // Handle the variable changing here!!!

  var twoInteractiveAxesInset = /*#__PURE__*/function () {
    // Add some padding to the plot??
    // The width and height are added in the template to the svg and zoom area rect. clip path has not been implemented yet. In the end it's good to define actions to change the width and height if needed.
    function twoInteractiveAxesInset() {
      _classCallCheck(this, twoInteractiveAxesInset);

      this.width = 400;
      this.height = 400;
      var obj = this;
      obj.node = html2element(template$7); // Make the axis objects, and connect them to the menu selection.
      // `obj.plotbox' specifies the area of the SVG that the chart should be drawn to.
      // Variables must be set later.

      obj.y = new ordinalAxis("y", obj.plotbox);
      obj.x = new ordinalAxis("x", obj.plotbox);
      var axisContainer = obj.node.querySelector("g.axes");
      axisContainer.appendChild(obj.y.node);
      axisContainer.appendChild(obj.x.node);
      var menuContainer = obj.node.querySelector("div.variable-select-menus");
      menuContainer.appendChild(obj.y.menu.node);
      menuContainer.appendChild(obj.x.menu.node);

      obj.y.onupdate = function () {
        obj.onupdate();
      };

      obj.x.onupdate = function () {
        obj.onupdate();
      }; // The zooming depends on the obj.y/x scales.


      obj.addZooming();
    } // constructor
    // What should the inset do if the variables change?
    // Just do a set, and let everything update itself.


    _createClass(twoInteractiveAxesInset, [{
      key: "update",
      value: function update(variables) {
        var obj = this;
        obj.x.update(variables);
        obj.y.update(variables);
      } // coordinateMenusWithAxes

    }, {
      key: "onupdate",
      value: function onupdate() {// dummy functon
      }
    }, {
      key: "plotbox",
      get: // onupdate
      function get() {
        // Specify the area of the svg dedicated to the plot. In this case it'll be all of it. The margin determines the amount of whitespace around the plot. This whitespace will NOT include the axis labels etc.
        var obj = this;
        var margin = {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }; // If the inset was not yet attached the getBoundingClientRect will return an empty rectangle. Instead, have this inset completely control the width and height of hte svg.
        // let svgrect = obj.node.getBoundingClientRect();

        var plot = {
          x: [margin.left, obj.width - margin.left - margin.right],
          y: [margin.top, obj.height - margin.top - margin.bottom]
        };
        return plot;
      } // plotbox

    }, {
      key: "isConfigured",
      get: function get() {
        var obj = this; // At the beginning the plot starts empty.

        return obj.x.variable.name != undefined && obj.y.variable.name != undefined;
      } // isConfigured
      // Maybe this can be an external module? But it depends directly on how the axis are specified - minimum reusability.

    }, {
      key: "addZooming",
      value: function addZooming() {
        var obj = this; // The current layout will keep adding on zoom. Rethink this for more responsiveness of the website.

        var zoom$1 = zoom().scaleExtent([0.01, Infinity]).on("zoom", zoomed); // Zoom operates on a selection. In this case a rect has been added to the markup to perform this task.

        select(obj.node).select("g.background").select("rect.zoom-area").call(zoom$1); // As of now (23/03/2020) the default zoom behaviour (https://d3js.org/d3.v5.min.js) does not support independantly scalable y and x axis. If these are implemented then on first zoom action (panning or scaling) will have a movement as the internal transform vector (d3.event.transform) won't corespond to the image. 
        // The transformation vector is based on the domain of the image, therefore any manual scaling of the domain should also change it. The easiest way to overcome this is to apply the transformation as a delta to the existing state.
        // obj.viewtransform is where the current state is stored. If it is set to -1, then the given zoom action is not performed to allow any difference between d3.event.transform and obj.viewtransform due to manual rescaling of the domain to be resolved.

        obj.viewtransform = identity;

        function zoomed(event) {
          // Get the current scales, and reshape them back to the origin.
          var t = event.transform;
          var t0 = obj.viewtransform; // Check if there was a manual change of the domain

          if (t0 == -1) {
            t0 = t;
          } // if
          // Hack to get the delta transformation.


          var dt = identity;
          dt.k = t.k / t0.k;
          dt.x = t.x - t0.x;
          dt.y = t.y - t0.y;
          obj.viewtransform = t;
          var xScaleDefined = obj.x.scale != undefined;
          var yScaleDefined = obj.y.scale != undefined;

          if (xScaleDefined && yScaleDefined) {
            // dt is the transformation of the domain that should take place. So first we get the current range, we apply the view transformation, and then we convert that back to the domain.
            var xdomain = obj.x.scale.range().map(dt.invertX, dt).map(obj.x.scale.invert, obj.x.scale);
            obj.x.setdomain(xdomain);
            var ydomain = obj.y.scale.range().map(dt.invertY, dt).map(obj.y.scale.invert, obj.y.scale);
            obj.y.setdomain(ydomain);
            obj.update();
          } // if

        } // zoomed

      } // addZooming

    }]);

    return twoInteractiveAxesInset;
  }(); // twoInteractiveAxesInset

  // Furthermore, each plot-model object should keep it's own set of configuration settings. This is a wrapper shell object that can hold those configurations.
  // Since the axes manage all the interactivity with variables the plot must use them to access the data to plot.
  // Move to separate file? No, this one shouldn't be used outside of a particular plot-model.

  var variableobj = /*#__PURE__*/function () {
    function variableobj(variable) {
      _classCallCheck(this, variableobj);

      this.active = false;
      this.transformtype = "linear";
      /*
      variable = {
      	name: ...
      	extent: ...
      }
      */

      var obj = this;
      obj.variable = variable;
    } // constructor
    // Some functionality to allow the subsequent modules to use this object as if it were the original variable object.


    _createClass(variableobj, [{
      key: "name",
      get: function get() {
        return this.variable.name;
      } // name

    }, {
      key: "extent",
      get: function get() {
        // Extent values will change if a transformation is selected.
        var obj = this;
        return obj.variable.extent.map(function (v) {
          return obj.transformValue(v);
        }); // map
        // return this.variable.extent 
      } // extent
      // What the label should be like.

    }, {
      key: "label",
      get: function get() {
        // Note that the label is always used to create a new element, and is passed through html2element. Therefore it can include html.
        var obj = this;

        switch (obj.transformtype) {
          case "log":
            return "log<sub>10</sub>(".concat(obj.name, ")");

          default:
            return obj.name;
        } // switch

      } // label

    }, {
      key: "changetransformtype",
      value: function changetransformtype(newtype) {
        this.transformtype = newtype;
      } // changetransformtype
      // Is the variable currently actively selected or not, and methods to change that.

    }, {
      key: "toggleactive",
      value: function toggleactive(value) {
        // If there is a value, then set it to the value. Otherwise toggle.
        var obj = this;

        if (value == true || value == false) {
          obj.active = value;
        } else {
          obj.active = obj.active ? false : true;
        } // if

      } // select
      // How to evaluate the data before passing it to the ML/AI model. Use the getvalue to get the number needed!

    }, {
      key: "getvalue",
      value: function getvalue(task) {
        var obj = this; // If variable = model, then model.variable should be accessed, therefore the call is variable.variable

        var value = task[obj.name]; // Perform the transformation if needed

        return obj.transformValue(value);
      } // getvalue

    }, {
      key: "transformValue",
      value: function transformValue(value) {
        var obj = this; // Perform the transformation if needed

        switch (obj.transformtype) {
          case "log":
            return Math.log10(value);

          default:
            return value;
        } // switch

      } // transformValue

    }]);

    return variableobj;
  }(); // variableobj

  var template$6 = "\n<div style=\"width: 400px; background-color: white;\">\n\t<div class=\"scatterplot\"></div>\n</div>\n";

  var scatterplot = /*#__PURE__*/function (_plotframe) {
    _inherits(scatterplot, _plotframe);

    var _super = _createSuper(scatterplot);

    function scatterplot(data) {
      var _this;

      _classCallCheck(this, scatterplot);

      _this = _super.call(this);
      _this.width = 400;

      var obj = _assertThisInitialized(_this);

      obj.data = data; // Append the plot backbone.

      var container = obj.node.querySelector("div.card-body");
      container.appendChild(html2element(template$6)); // Add a scatterplot inset. When initialising already pass in the card size.

      obj.svgobj = new twoInteractiveAxesInset([]);
      container.querySelector("div.scatterplot").appendChild(obj.svgobj.node);

      obj.svgobj.onupdate = function () {
        obj.refresh();
      }; // function
      // Change the initial title


      obj.node.querySelector("input.card-title").value = "Scatterplot";
      return _this;
    } // constructor


    _createClass(scatterplot, [{
      key: "update",
      value: function update() {
        // Update this plot.
        var obj = this;
        obj.svgobj.update();
        obj.refresh();
      } // update

    }, {
      key: "updatedata",
      value: function updatedata() {
        var obj = this;
        var variables = obj.data.variablenames.map(function (name) {
          return new variableobj({
            name: name,
            extent: extent(obj.data.tasks, function (t) {
              return t.metadata[name];
            })
          }); // new variableobj
        });
        obj.svgobj.update(variables);
        obj.draw();
      } // updatedata

    }, {
      key: "getcolor",
      value: function getcolor(d, defaultcolor) {
        var obj = this; // Just add in a condition that if the point is outside of the filter it should be gainsboro.

        var c = obj.data.current ? obj.data.current == d ? defaultcolor : "gainsboro" : defaultcolor;
        c = obj.data.datum == d ? "orange" : c;
        return c;
      } // getcolor
      // Create teh actual SVG elements.

    }, {
      key: "draw",
      value: function draw() {
        // config:  data, gclass, color, showline.
        var obj = this;
        var circles = select(obj.node).select("g.data").selectAll("circle").data(obj.data.subset.value); // First exit.

        circles.exit().remove(); // Finally add new circles.

        circles.enter().append("circle").attr("r", 5).attr("cx", -10).attr("cy", -10).on("mouseenter", function (e, d) {
          // obj.data.current = d;
          obj.data.setcurrent(d);
          obj.data.repaint();
        }).on("mouseout", function (e, d) {
          // obj.data.current = undefined;
          obj.data.setcurrent(undefined);
          obj.data.repaint();
        }).on("click", function (e, d) {
          // obj.data.datum = obj.data.datum == d ? undefined : d;
          obj.data.selecttask(d);
          obj.data.repaint();
        });
        obj.refresh();
      } // draw
      // Try to implement a smaller update possibility to try and improve interactivity.

    }, {
      key: "repaint",
      value: function repaint() {
        var obj = this;
        var circles = select(obj.node).select("g.data").selectAll("circle");
        circles.attr("fill", function (d) {
          return obj.getcolor(d, "cornflowerblue");
        }); // If there is a current element selected it should be raised.

        if (obj.data.current || obj.data.datum) {
          circles.filter(function (d) {
            return [obj.data.current, obj.data.datum].includes(d);
          }).each(function (d, i, el) {
            // When the element is raised it is repositioned the mouseout etc events to be triggered...
            el[0].parentElement.insertBefore(el[0], null);
          });
        } // if	

      } // repaint
      // Reposition and repaint the circles.

    }, {
      key: "refresh",
      value: function refresh() {
        var obj = this;

        if (obj.svgobj.isConfigured) {
          var xaxis = obj.svgobj.x;
          var yaxis = obj.svgobj.y;
          select(obj.node).select("g.data").selectAll("circle").attr("cx", function (d) {
            return xaxis.getdrawvalue(d.metadata);
          }).attr("cy", function (d) {
            return yaxis.getdrawvalue(d.metadata);
          });
          obj.repaint();
        } // if

      } // refresh

    }]);

    return scatterplot;
  }(plotframe); // scatterplot

  var brush = /*#__PURE__*/function () {
    function brush(svg, g, type) {
      _classCallCheck(this, brush);

      this.p0 = [0, 0];
      this.p1 = [0, 0]; // Both svg and g should be d3.select(node). Furthermore, allow functionality modes.

      var obj = this;
      obj.svg = svg;
      obj.type = ["horizontal", "vertical", "2d"].includes(type) ? type : "2d"; // Extend to pass in both interaction and element hosts.

      obj.rect = g.append("rect").attr("x", 0).attr("y", 0).attr("width", 0).attr("height", 0).attr("fill", "gray").attr("opacity", 0.4);
      var active = false;
      svg.addEventListener("mousedown", function (e) {
        // Store start point.
        obj.p0 = pointer(e);
        obj.p1 = pointer(e);
        active = true;
      }); // mousedown

      svg.addEventListener("mousemove", function (e) {
        // Update the end point. Interactively update teh filters.
        if (active) {
          obj.p1 = pointer(e);
          obj.update();
        } // if

      }); // mousemove

      svg.addEventListener("mouseup", function (e) {
        // If the points are too close together then the interval should be teh variable extent. Or the filter should be cleared.
        if (dist(obj.p0, obj.p1) < Math.pow(5, 2)) {
          obj.clear();
        } else {
          obj.submit();
        } // if


        active = false;
      }); // mouseup
      obj.rect.node();
      /* THIS IS QUITE COMPLICATED!!!
      rect.addEventListener("mousedown", function(e){
      	e.stopPropagation();
      	// If the user clicked on the rectangle, then the rectangle should be adjusted, as opposed to made from scratch.
      	let box = rect.getBoundingClientRect();
      	let point = [e.clientX - box.x, e.clientY - box.y];
      	// console.log("edit", [point[0]/box.width, point[1]/box.height])
      })
         */
    } // constructor


    _createClass(brush, [{
      key: "update",
      value: function update(x, y, w, h) {
        var obj = this; // Allow inputs to update brush.

        var xd = x ? x : Math.min(obj.p0[0], obj.p1[0]);
        var yd = y ? y : Math.min(obj.p0[1], obj.p1[1]);
        var wd = w ? w : Math.abs(obj.p0[0] - obj.p1[0]);
        var hd = h ? h : Math.abs(obj.p0[1] - obj.p1[1]); // For some brush types the width/height has to be set to the svg width/height.

        var b = obj.svg.getBBox();
        var xdt = obj.type == "vertical" ? 0 : xd;
        var ydt = obj.type == "horizontal" ? 0 : yd;
        var wdt = obj.type == "vertical" ? b.width : wd;
        var hdt = obj.type == "horizontal" ? b.height : hd; // console.log( xdt,ydt,wdt,hdt )

        obj.rect.attr("x", xdt).attr("y", ydt).attr("width", wdt).attr("height", hdt);
      } // update
      // Dummy functions to allow behavior to be prescribed.

    }, {
      key: "clear",
      value: function clear() {} // clear

    }, {
      key: "submit",
      value: function submit() {} // submit

    }]);

    return brush;
  }(); // brush

  function dist(a, b) {
    return Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2);
  } // dist

  /*
  Needs to update hte filtering dimensions. But also the dimensions should be dynamic?
  How many dimensions will crossfilter support?


  Filtering plots should highlight the filter setting - this is different functionality than comparison plots!!
  But both could be combined!!
  */

  var filterscatterplot = /*#__PURE__*/function (_scatterplot) {
    _inherits(filterscatterplot, _scatterplot);

    var _super = _createSuper(filterscatterplot);

    function filterscatterplot(data) {
      var _this;

      _classCallCheck(this, filterscatterplot);

      _this = _super.call(this, data);

      var obj = _assertThisInitialized(_this); // Add functionality to draw a rectangle... How will this be done since the scatterplot has to support zoom... For now the zoom can be disabled by removing the rectangle hosting it.


      select(obj.svgobj.node).select("g.background").select("rect.zoom-area").remove(); // Now add the drawing of the box.

      var svg = obj.svgobj.node.querySelector("svg");
      var g = select(svg).select("g.markup");
      obj.brush = new brush(svg, g, "2d");

      obj.brush.clear = function () {
        // Clear the filter
        obj.data.filterremove(obj.svgobj.x.variable.name);
        obj.data.filterremove(obj.svgobj.y.variable.name);
      }; // clear


      obj.brush.submit = function () {
        // Apply the filter
        var intervals = obj.calculateIntervals();
        obj.data.filterapply(obj.svgobj.x.variable.name, intervals[0]);
        obj.data.filterapply(obj.svgobj.y.variable.name, intervals[1]);
      }; // submit
      // Changing the variable on the axis should remove the filter, as it is no longer visible.


      obj.svgobj.onupdate = function () {
        obj.refresh();
        obj.data.filtertrim();
      }; // onupdate
      // Subscribe the plot to any changes of the subset.


      obj.data.subset.subscribe(function () {
        obj.repaint();
      }); // subscribe

      return _this;
    } // constructor


    _createClass(filterscatterplot, [{
      key: "repaint",
      value: function repaint() {
        // On user interactions the data is merely repainted, and not replaced to accelerate interactions. But the brushes do need to be updated.
        _get(_getPrototypeOf(filterscatterplot.prototype), "repaint", this).call(this);

        var obj = this; // Update the brush. But only show it if one of the ranges is defined.

        var x = obj.data.filters[obj.svgobj.x.variable.name];
        var y = obj.data.filters[obj.svgobj.y.variable.name];

        if (x || y) {
          var xrange = x ? x.range : obj.svgobj.x.variable.extent;
          var yrange = y ? y.range : obj.svgobj.y.variable.extent;
          obj.updateBrush([xrange, yrange]);
        } // if

      } // repaint

    }, {
      key: "calculateIntervals",
      value: function calculateIntervals() {
        // Calculate the intervals having been given two diagonally opposing points. The returned intervals should be in data units.
        var obj = this;
        var x = [obj.brush.p0[0], obj.brush.p1[0]];
        var y = [obj.brush.p0[1], obj.brush.p1[1]];
        return [x.map(function (v) {
          return obj.svgobj.x.scale.invert(v);
        }).sort(), y.map(function (v) {
          return obj.svgobj.y.scale.invert(v);
        }).sort()];
      } // calculateIntervals

    }, {
      key: "updateBrush",
      value: function updateBrush(intervals) {
        var obj = this;
        var x = obj.svgobj.x.scale;
        var y = obj.svgobj.y.scale; // Note that the y-axis is inverted by default, so a high variable value converts to a small pixel value. Furthermore, the top left corner of the rectangle will be at the maximum value of the interval.

        obj.brush.update(x(intervals[0][0]), y(intervals[1][1]), x(intervals[0][1]) - x(intervals[0][0]), y(intervals[1][0]) - y(intervals[1][1])); // console.log("width", intervals[0], x(intervals[0][1]) > x(intervals[0][0]) )
        // console.log("height", intervals[1], y(intervals[1][0]) > y(intervals[1][1]) )
      } // updateBrush

    }]);

    return filterscatterplot;
  }(scatterplot); // filterscatterplot
   // calculateRange

  /* I want to support:
   - linear		: scaleLinear
   - logarithmic	: scaleLog - must not cross 0!!
   
   And variable types:
   - number       : can be used as is.
   - datetime		: scaleTime() 
  		.domain([new Date(2000, 0, 1), new Date(2000, 0, 2)])
  		.range([0, 960]);
  scales
  */

  var textattributes = "fill=\"black\" font-size=\"10px\" font-weight=\"bold\"";
  var exponenttemplate = "\n<text class=\"linear\" ".concat(textattributes, ">\n\t<tspan>\n\t  x10\n\t  <tspan class=\"exp\" dy=\"-5\"></tspan>\n\t</tspan>\n</text>\n");
  var logtemplate = "\n<text class=\"log\" ".concat(textattributes, " display=\"none\">\n\t<tspan>\n\t  log\n\t  <tspan class=\"base\" dy=\"5\">10</tspan>\n\t  <tspan class=\"eval\" dy=\"-5\">(x)</tspan>\n\t</tspan>\n</text>\n"); // text -> x="-8" / y="-0.32em"

  var template$5 = "\n\t<g class=\"graphic\"></g>\n\t\n\t<g class=\"model-controls\" style=\"cursor: pointer;\">\n\t\t".concat(exponenttemplate, "\n\t\t").concat(logtemplate, "\n\t</g>\n\t<g class=\"domain-controls\" style=\"cursor: pointer;\">\n\t\t<text class=\"plus hover-highlight\" ").concat(textattributes, ">+</text>\n\t\t<text class=\"minus hover-highlight\" ").concat(textattributes, ">-</text>\n\t</g>\n\t<g class=\"variable-controls\" style=\"cursor: pointer;\">\n\t\t<text class=\"label hover-highlight\" ").concat(textattributes, " text-anchor=\"end\">Variable name</text>\n\t</g>\n"); // The exponent should be replaced with the logarithmic controls if the axis switches from linear to log.
  // Now I need to add in a label saying linear/log
  // DONE!! Maybe a plus/minus next to the axes to increase the axis limits - instead of dragging the labels.
  // The changing between the variables is done in the parent, and not in the axis. This is simply because this class only controls it's own node, and there isn't space to show all the options. Therefore the parent must allocate the space for the change of variables.
  // How to change between the scale interpretations? What should I click? Maybe the exponent text? But then it should always be visible. Let's try that yes. But how to differentiate between clicking on hte text, and editing the text??

  var StaticOrdinalAxis = /*#__PURE__*/function () {
    // These margins are required to completely fit the scales along with their labels, ticks and domain lines onto the plot.
    function StaticOrdinalAxis(axis, plotbox) {
      _classCallCheck(this, StaticOrdinalAxis);

      this._type = "linear";
      this.ticks = undefined;
      this.variable = {
        name: "N",
        extent: [1, 1]
      };
      this.domain = [1, 1];
      this.supportedtypes = ["linear", "log"];
      this.margin = {
        top: 30,
        right: 30,
        bottom: 40,
        left: 40
      };
      /* `axis' is a flag that signals whether it should be a vertical or horizontal axis, `svgbbox' allows the axis to be appropriately positioned, and therefore define the plotting area, and `ordinalvariable' is a dbslice ordinal variable which is paired with this axis. */

      var obj = this; // make the axis group.

      obj.d3node = create$1("svg:g").attr("class", "".concat(axis, "-axis")).html(template$5);
      obj.node = obj.d3node.node(); // Get rid of axis by abstracting?

      obj.axis = axis;
      obj.setplotbox(plotbox); // Add the functionality to the domain change.

      var controls = obj.d3node.select("g.domain-controls");
      controls.select("text.plus").on("click", function () {
        obj.plusdomain();
        obj.update();
      });
      controls.select("text.minus").on("click", function () {
        obj.minusdomain();
        obj.update();
      }); // Add teh functionality to toggle the axis type.

      var exponent = obj.d3node.select("g.model-controls");
      exponent.on("click", function () {
        obj.incrementtype();
        obj.update();
      });
    } // constructor


    _createClass(StaticOrdinalAxis, [{
      key: "update",
      value: function update() {
        var obj = this;
        obj.position();
        obj.draw();
        obj.onupdate();
      } // update
      // Dummy function to allow updates on user interactions.

    }, {
      key: "onupdate",
      value: function onupdate() {} // onupdate
      // Drawing of the svg axes.

    }, {
      key: "position",
      value: function position() {
        // If the range changes, then the location of the axes must change also. And with them the exponents should change location.
        var obj = this; // Position the axis. This will impact all of the following groups that are within the axes group.

        var ax = obj.axis == "y" ? obj.margin.left : 0;
        var ay = obj.axis == "y" ? 0 : obj.plotbox.y[1] - obj.margin.bottom;
        obj.d3node.attr("transform", "translate(".concat(ax, ", ").concat(ay, ")")); // Reposition hte exponent.

        var model = obj.d3node.select("g.model-controls");
        model.attr("text-anchor", obj.axis == "y" ? "start" : "end");
        var mx = obj.axis == "y" ? 0 + 6 : obj.range[1];
        var my = obj.axis == "y" ? obj.margin.top + 3 : 0 - 6;
        model.attr("transform", "translate(".concat(mx, ", ").concat(my, ")")); // Reposition the +/- controls.

        var controls = obj.d3node.select("g.domain-controls");
        var cx = obj.axis == "y" ? 0 - 5 : obj.range[1] + 10;
        var cy = obj.axis == "y" ? obj.margin.top - 10 : 0 + 5;
        controls.attr("transform", "translate(".concat(cx, ", ").concat(cy, ")")); // Reposition hte actual plus/minus.

        var dyPlus = obj.axis == "y" ? 0 : -5;
        var dxPlus = obj.axis == "y" ? -5 : 0;
        var dyMinus = obj.axis == "y" ? 0 : 5;
        var dxMinus = obj.axis == "y" ? 5 : 1.5;
        controls.select("text.plus").attr("dy", dyPlus);
        controls.select("text.plus").attr("dx", dxPlus);
        controls.select("text.minus").attr("dy", dyMinus);
        controls.select("text.minus").attr("dx", dxMinus); // Position the variable label.

        var labelgroup = obj.d3node.select("g.variable-controls");
        var label = labelgroup.select("text.label"); // The text should be flush with the axis. To allow easier positioning use the `text-anchor' property.

        label.attr("writing-mode", obj.axis == "y" ? "tb" : "lr");
        label.text(obj.variable.name ? obj.variable.name : "Variable name");
        var lx = obj.axis == "y" ? 30 : obj.range[1];
        var ly = obj.axis == "y" ? -obj.margin.top : 30;
        var la = obj.axis == "y" ? 180 : 0;
        labelgroup.attr("transform", "rotate(".concat(la, ") translate(").concat(lx, ", ").concat(ly, ")"));
      } // position

    }, {
      key: "draw",
      value: function draw() {
        var obj = this;
        obj.d3node.selectAll("g.model-controls").select("text").attr("fill", obj.exponent > 0 ? "black" : "black").select("tspan.exp").html(obj.exponent); // A different scale is created for drawing to allow specific labels to be created (e.g. for scientific notation with the exponent above the axis.)	

        var d3axisType = obj.axis == "y" ? axisLeft : axisBottom;
        var d3axis = d3axisType(obj.scale);

        if (obj.ticks) {
          d3axis.tickValues(obj.ticks);
        }
        obj.d3node.select("g.graphic").call(d3axis); // Control the ticks. Mak

        obj.d3node.select("g.graphic").selectAll("text").html(function (d) {
          return obj.tickformat(d);
        }); // Switch between the model controls.

        var modelcontrols = obj.d3node.select("g.model-controls");
        modelcontrols.selectAll("text").attr("display", "none");
        modelcontrols.select("text." + obj.type).attr("display", "");
      } // draw
      // MOVE ALL THESE SWITCHES SOMEWHERE ELSE. MAYBE JUST CREATE A SUPPORTED OBJECT OUTSIDE SO ALL THE SMALL CHANGES CAN BE HANDLED THERE.

    }, {
      key: "tickformat",
      value: function tickformat(d) {
        // By default the tick values are assigned to all tick marks. Just control what appears in hte labels.
        var obj = this;
        var label;

        switch (obj.type) {
          case "log":
            // Only orders of magnitude. Keep an eye out for number precision when dividing logarithms!
            var res = Math.round(Math.log(d) / Math.log(obj.scale.base()) * 1e6) / 1e6; // Counting ticks doesn't work, because the ticks don't necessarily begin with the order of magnitude tick.

            label = Number.isInteger(res) ? d : "";
            break;

          case "linear":
            // All of them, but adjusted by the common exponent. 
            label = d / Math.pow(10, obj.exponent);
            break;
        } // switch


        return label;
      } // tickformat

    }, {
      key: "getdrawvalue",
      value: function getdrawvalue(t) {
        // Given a task return its coordinate.
        // This is just implemented for more strict control of wht this axis can do. It's not strictly needed because the scale underneath is not being changed.
        // Needs the current object as it evaluates the incoming value using the current scale.
        var obj = this;
        var v = obj.variable.getvalue(t); // Return only the value of the current axis selection. Also, if the data doesn't have the appropriate attribute, then position hte point off screen instead of returning undefined. Will this break if viewPort is adjusted?

        var dv = obj.scale(v);
        return dv ? dv : -10;
      } // getdrawvalue
      // Getting values required to setup the scales.

    }, {
      key: "scale",
      get: function get() {
        // Computed value based on hte selected scale type.
        var obj = this;
        var scale;

        switch (obj.type) {
          case "log":
            scale = log();
            break;

          case "linear":
          default:
            scale = linear();
            break;
        } // switch
        // If the domain is below zero always Math.abs it to work with positive values.
        // The domain of this one  goes below zero... It's because the domain was extended there!! Ah, will this break the zooming and panning below zero?? Probably no? Logs aren't defined for negtive values anyway? So what do I do in those cases? Do I just add a translation in the data? For now just
        // Deal with the exponent. Will this require accessor functions?? This means that there should be another
        // I will want the axis configuration to be stored and communicated further to pass into a python module. How will I do that? For that I'll need to evaluate teh data passed into the module. So I should use an evaluator anyway. Where should this evaluator be present? It should be present in the plot. The axis should return the parameters required for the evaluation. But it also needs to return the scale to be used for drawing. Actually, it just needs to present the draw value given some input. So just have that exposed? And a general evaluator that can handle any combination of inputs?


        scale.range(obj.range).domain(obj.domain);
        return scale;
      } // get scale

    }, {
      key: "range",
      get: function get() {
        // When initialising a new range - e.g. on plot rescaling, the scales need to change
        var obj = this; // When the axis is made the first tick is translated by the minimum of the range. Therefore the margin is only added when adjusting the `_range`. 

        if (obj.axis == "y") {
          // The browsers coordinate system runs from top of page to bottom. This is opposite from what we're used to in engineering charts. Reverse the range for hte desired change.
          var r = [obj.plotbox.y[0] + obj.margin.top, obj.plotbox.y[1] - obj.margin.bottom];
          return [r[1], r[0]];
        } else {
          return [obj.plotbox.x[0] + obj.margin.left, obj.plotbox.x[1] - obj.margin.right];
        } // if

      } // get range

    }, {
      key: "setplotbox",
      value: function setplotbox(plotbox) {
        // The vertical position of the axis doesn't actually depend on the range. The y-position for the x axis should be communicated from outside. The axis should always get the x and y dimesnion of the svg we're placing it on.
        this.plotbox = plotbox;
      } // plotbox
      // Domain changes

    }, {
      key: "setdomain",
      value: function setdomain(domain) {
        this.domain = domain;
      } // domain

    }, {
      key: "plusdomain",
      value: function plusdomain() {
        // Extend the domain by one difference between the existing ticks. It's always extended by hte distance between the last two ticks.
        var obj = this;
        var currentdomain = obj.domain;
        var ticks = obj.scale.ticks(); // Calculate the tick difference. If that fails just set the difference to 10% of the domain range.

        var tickdiff = ticks[ticks.length - 1] - ticks[ticks.length - 2];
        tickdiff = tickdiff ? tickdiff : 0.1(currentdomain[1] - currentdomain[0]); // Set the new domain.

        this.domain = [currentdomain[0], currentdomain[1] + tickdiff];
      } // plusdomain

    }, {
      key: "minusdomain",
      value: function minusdomain() {
        // Reduce the domain by one difference between the existing ticks. It's always extended by hte distance between the last two ticks.
        var obj = this;
        var currentdomain = obj.domain;
        var ticks = obj.scale.ticks(); // Calculate the tick difference. If that fails just set the difference to 10% of the domain range.

        var tickdiff = ticks[ticks.length - 1] - ticks[ticks.length - 2];
        tickdiff = tickdiff ? tickdiff : 0.1(currentdomain[1] - currentdomain[0]); // Set the new domain.

        this.domain = [currentdomain[0], currentdomain[1] - tickdiff];
      } // minusdomain
      // Creating model variables.
      // This exponent should be reworked to just return the transformation configuration.
      // Difference between the tick labels, and the data for evaluation. For the evaluation whatever is displayed on hte axes should be passed to the model. But the exponent is just a cosmetic change.
      // Can also use the exponent to guess what space we should be viewing the data in? Maybe not. For example erroneous values.
      // Difference between a log scale transformation and a log scale axis. The log axis still shows the exact same values, whereas the transform will create new values. Do I want to differentiate between the two, or just apply a log transformation if the data is visualised with a log scale? Even if the data is in hte log scale the user may still want to use it as such?
      // Still connect both - what you see is what you get. But on hte log plot maybe still keep the original labels?? Let's see how it goes.
      // So if I have an exponent do I change the domain? But the exponent depends on the domain...Create a labelaxis just to draw the labels??

    }, {
      key: "exponent",
      get: function get() {
        var obj = this;

        if (obj.domain.length > 0) {
          var maxExp = calculateExponent(obj.domain[1]);
          var minExp = calculateExponent(obj.domain[0]); // Which exponent to return? It has to be a multiple of three - guaranteed by calculateExponent.
          // -10.000 - 10.000 -> 3
          // 0 - 10.000 -> 3
          // 0 - 1.000.000 -> 3 - to minimize string length?
          // 
          // If the order of magnitude is a factor of 3 then return the maximum one. e.g. range of 100 - 100.000 go for 3 to reduce teh string length

          return maxExp - minExp >= 3 ? maxExp : minExp;
        } else {
          return 0;
        } // if

      } // exponent
      // Changing the scale type. Click on the exponent to change the 

    }, {
      key: "nexttype",
      value: function nexttype(type) {
        // Sequence of axis types.
        var obj = this;
        var imax = obj.supportedtypes.length - 1;
        var inext = obj.supportedtypes.indexOf(type) + 1;
        var i = inext > imax ? inext - imax - 1 : inext;
        return obj.supportedtypes[i];
      } // nexttype
      // Shouldn't really migrate the type of axes from the ordinalAxes to the variable. What if teh variable isn't observable for instance? In that case use an observable attribute of this class.

    }, {
      key: "incrementtype",
      value: function incrementtype() {
        var obj = this;
        var newtype = obj.nexttype(obj.type); // If the switch is to `log' the domain needs to be changed to be positive. So: don't allow the change to log. If the user wants to use a log transformation on the data they need to first et it in the right range.

        if (newtype == "log") {
          var extent = obj.variable.extent;
          var invalidExtent = extent[0] * extent[1] <= 0;

          if (invalidExtent) {
            // Move to next type.
            newtype = obj.nexttype(newtype);
          } // if

        } // if
        // Set the new type.


        obj.type = newtype; // Try to increment it for the variable obj too.

        if (typeof obj.variable.changetransformtype == "function") {
          obj.variable.changetransformtype(newtype);
        } // if
        // Always switch back to the original domain.


        if (obj.variable) {
          obj.setdomain(obj.variable.extent);
        } // if

      } // incrementtype

    }, {
      key: "type",
      get: // type
      function get() {
        // Maybe adjust this one so that it gets the type from the variable, if it's available.
        var obj = this; // Default value.

        var _type = obj._type; // But if the variable is defined, and it has a correctly defined type, then use that one instead. If it's observable this will also update automatically.

        if (obj.variable) {
          var customtype = obj.variable.transformtype;

          if (obj.supportedtypes.includes(customtype)) {
            _type = customtype;
          } // if

        }

        return _type;
      } // type
      ,
      set: function set(newtype) {
        var obj = this; // The type can be set to a specific value.

        if (obj.supportedtypes.includes(newtype)) {
          obj._type = newtype;
        } // if

      }
    }]);

    return StaticOrdinalAxis;
  }(); // StaticOrdinalAxis

  /*
  background: elements for background functionality (e.g. zoom rectangle)
  data      : primary data representations
  markup    : non-primary data graphic markups, (e.g. compressor map chics) 
  x/y-axis  : x/y axis elements
  exponent  : power exponent (big number labels may overlap otherwise)
  */

  var template$4 = "\n<div style=\"position: relative;\">\n\t<svg class=\"plot-area\" width=\"400\" height=\"400\">\n\t\t\n\t\t<g class=\"background\">\n\t\t\t\n\t\t\t<g class=\"tooltip-anchor\">\n\t\t\t\t<circle class=\"anchor-point\" r=\"1\" opacity=\"0\"></circle>\n\t\t\t</g>\n\t\t</g>\n\t\t\n\t\t\n\t\t<g class=\"datum\"></g>\n\t\t<g class=\"data\"></g>\n\t\t<g class=\"markup\"></g>\n\t\t<g class=\"axes\"></g>\n\t\t\n\t\t\n\t</svg>\n\t\n\t<div class=\"variable-select-menus\"></div>\n\t\n</div>\n";
  /*
  The histogram inset is a modification of teh two interactive axis inset. Firstly, the y-axis is made to be static. Secondly, the domain increase functionality needs to be ammended to change the number of bins instead of changing the actual domain.
  */

  var HistogramInset = /*#__PURE__*/function () {
    function HistogramInset() {
      _classCallCheck(this, HistogramInset);

      this.width = 400;
      this.height = 400;
      var obj = this;
      obj.node = html2element(template$4); // Make the axis objects, and connect them to the menu selection.
      // `obj.plotbox' specifies the area of the SVG that the chart should be drawn to.
      // Variables must be set later.

      obj.y = new StaticOrdinalAxis("y", obj.plotbox);
      obj.x = new ordinalAxis("x", obj.plotbox);
      var axisContainer = obj.node.querySelector("g.axes");
      axisContainer.appendChild(obj.y.node);
      axisContainer.appendChild(obj.x.node);
      var menuContainer = obj.node.querySelector("div.variable-select-menus");
      menuContainer.appendChild(obj.x.menu.node);
      obj.x.nbins = 10;

      obj.x.plusdomain = function () {
        obj.x.nbins += 1;
      }; // plusdomain


      obj.x.minusdomain = function () {
        // Make sure the number of bins is above 0.
        obj.x.nbins = Math.max(obj.x.nbins - 1, 1);
      }; // plusdomain

    } // constructor


    _createClass(HistogramInset, [{
      key: "update",
      value: function update(variables) {
        var obj = this;
        obj.x.update(variables);
        obj.y.update();
      } // update

    }, {
      key: "plotbox",
      get: function get() {
        // Specify the area of the svg dedicated to the plot. In this case it'll be all of it. The margin determines the amount of whitespace around the plot. This whitespace will NOT include the axis labels etc.
        var obj = this;
        var margin = {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }; // If the inset was not yet attached the getBoundingClientRect will return an empty rectangle. Instead, have this inset completely control the width and height of hte svg.
        // let svgrect = obj.node.getBoundingClientRect();

        var plot = {
          x: [margin.left, obj.width - margin.left - margin.right],
          y: [margin.top, obj.height - margin.top - margin.bottom]
        };
        return plot;
      } // plotbox

    }, {
      key: "isConfigured",
      get: function get() {
        var obj = this; // At the beginning the plot starts empty.

        return obj.x.variable.name != undefined;
      } // isConfigured

    }]);

    return HistogramInset;
  }(); // HistogramInset

  var template$3 = "\n<div style=\"width: 400px; background-color: white;\">\n\t<div class=\"histogram\"></div>\n</div>\n";

  var histogram = /*#__PURE__*/function (_plotframe) {
    _inherits(histogram, _plotframe);

    var _super = _createSuper(histogram);

    function histogram(data) {
      var _this;

      _classCallCheck(this, histogram);

      _this = _super.call(this);
      _this.width = 400;

      var obj = _assertThisInitialized(_this);

      obj.data = data; // Object to calculate the histgoram.

      obj.histogram = bin();
      obj.bins = []; // Append the plot backbone.

      var container = obj.node.querySelector("div.card-body");
      container.appendChild(html2element(template$3)); // Add a histogram inset. When initialising already pass in the card size.

      obj.svgobj = new HistogramInset();
      container.querySelector("div.histogram").appendChild(obj.svgobj.node);

      obj.svgobj.x.onupdate = function () {
        obj.updatebins();
        obj.draw();
        obj.repaint();
      }; // function


      obj.svgobj.y.onupdate = function () {
        obj.refresh();
      }; // function
      // Change the initial title


      obj.node.querySelector("input.card-title").value = "Histogram";
      return _this;
    } // constructor


    _createClass(histogram, [{
      key: "update",
      value: function update() {
        var obj = this;
        obj.svgobj.update();
        obj.refresh();
      } // update

    }, {
      key: "updatedata",
      value: function updatedata() {
        // Launch if the global data changes -> new variables are needed.
        var obj = this;
        var variables = obj.data.variablenames.map(function (name) {
          return new variableobj({
            name: name,
            extent: extent(obj.data.tasks, function (t) {
              return t.metadata[name];
            })
          }); // new variableobj
        });
        obj.svgobj.update(variables);
        obj.draw();
      } // updatedata  

    }, {
      key: "updatebins",
      value: function updatebins() {
        var obj = this;
        var x = obj.svgobj.x;
        var y = obj.svgobj.y;
        var thresholds = Array(x.nbins + 1).fill().map(function (el, i) {
          return x.domain[0] * (x.nbins - i) / x.nbins + x.domain[1] * i / x.nbins;
        });
        obj.histogram.value(function (d) {
          return d.metadata[x.variable.name];
        }).domain(x.domain).thresholds(thresholds); // d3.thresholdFreedmanDiaconis(values, min, max)
        // All bins should be calculated here, as it onlz depends on the overall data. Subset bins are calculated here to allow ???

        obj.allbins = obj.histogram(obj.data.tasks);
        obj.bins = obj.histogram(obj.data.subset.value); // The y-axis depends on the bins, so it needs to be updated here.

        y.setdomain([0, max(obj.allbins, function (b) {
          return b.length;
        })]); // y.ticks = Array(y.domain[1]+1).fill().map((v,i)=>i); // For bins with 100 items this creates 100 labels.

        y.draw();
      } // updatebins

    }, {
      key: "draw",
      value: function draw() {
        var obj = this;
        obj.makeRects(obj.allbins, "outline", "gainsboro");
        obj.updateRects("outline");
        obj.makeRects(obj.bins, "active", "cornflowerblue");
        obj.refresh();
      } // draw

    }, {
      key: "makeRects",
      value: function makeRects(data, name, color) {
        var obj = this;
        var x = obj.svgobj.x.scale;
        var y = obj.svgobj.y.scale;
        var rects = select(obj.node).select("g.data").selectAll("rect.".concat(name)).data(data);
        rects.exit().remove();
        rects.enter().append("rect").attr("class", name).attr("x", function (b) {
          return x(b.x0);
        }).attr("y", function (b) {
          return y(0);
        }).attr("width", function (b) {
          return Math.max(x(b.x1) - x(b.x0) - 1, 0);
        }).attr("height", function (b) {
          return 0;
        }).attr("fill", color);
      } // makeRects

    }, {
      key: "updateRects",
      value: function updateRects(name) {
        var obj = this;

        if (obj.svgobj.isConfigured) {
          var x = obj.svgobj.x.scale;
          var y = obj.svgobj.y.scale;
          select(obj.node).select("g.data").selectAll("rect.".concat(name)).transition().attr("x", function (b) {
            return x(b.x0);
          }).attr("y", function (b) {
            return y(b.length);
          }).attr("width", function (b) {
            return Math.max(x(b.x1) - x(b.x0) - 1, 0);
          }).attr("height", function (b) {
            return y(0) - y(b.length);
          });
        } // if

      } // updateRects

    }, {
      key: "refresh",
      value: function refresh() {
        var obj = this;
        obj.bins = obj.histogram(obj.data.subset.value);
        select(obj.node).select("g.data").selectAll("rect.active").data(obj.bins);
        obj.updateRects("active");
      } // refresh

    }, {
      key: "repaint",
      value: function repaint() {
        // Repaint is called as part of the global update, as for the sctterplot it's sufficient to reapply colors when filtering. But for the histogram the underlying data must be recalculated.
        var obj = this;
        obj.refresh();
      } // repaint

    }]);

    return histogram;
  }(plotframe); // histogram

  /* Extend the histogram to allow filtering using a rectange */

  var filterhistgoram = /*#__PURE__*/function (_histogram) {
    _inherits(filterhistgoram, _histogram);

    var _super = _createSuper(filterhistgoram);

    function filterhistgoram(data) {
      var _this;

      _classCallCheck(this, filterhistgoram);

      _this = _super.call(this, data);

      var obj = _assertThisInitialized(_this); // Add functionality to draw a rectangle.
      // Now add the drawing of the box.


      var svg = obj.svgobj.node.querySelector("svg");
      var g = select(svg).select("g.markup"); // Add in a brush

      obj.brush = new brush(svg, g, "horizontal");

      obj.brush.clear = function () {
        // Clear the filter
        obj.data.filterremove(obj.svgobj.x.variable.name);
      }; // clear


      obj.brush.submit = function () {
        // Apply the filter
        obj.data.filterapply(obj.svgobj.x.variable.name, obj.calculateInterval());
      }; // submit
      // Needs to also trim the filters when navigating away from dimension.


      obj.svgobj.x.onupdate = function () {
        obj.updatebins();
        obj.draw();
        obj.repaint();
        obj.data.filtertrim();
      }; // function
      // Subscribe the plot to any changes of the subset.


      obj.data.subset.subscribe(function () {
        obj.repaint();
      }); // subscribe

      return _this;
    } // constructor


    _createClass(filterhistgoram, [{
      key: "repaint",
      value: function repaint() {
        _get(_getPrototypeOf(filterhistgoram.prototype), "repaint", this).call(this);

        var obj = this;
        var x = obj.svgobj.x.scale;
        var xf = obj.data.filters[obj.svgobj.x.variable.name];

        if (xf) {
          obj.brush.update(x(xf.range[0]), undefined, x(xf.range[1]) - x(xf.range[0]), undefined);
        } // if

      } // repaint

    }, {
      key: "calculateInterval",
      value: function calculateInterval() {
        // Calculate the intervals having been given two diagonally opposing points. The returned intervals should be in data units.
        var obj = this;
        var x = [obj.brush.p0[0], obj.brush.p1[0]];
        return x.map(function (v) {
          return obj.svgobj.x.scale.invert(v);
        }).sort();
      } // calculateIntervals

    }]);

    return filterhistgoram;
  }(histogram); // filterhistgoram

  var template$2 = "\n<div style=\"width: 400px; background-color: white;\">\n\t<div class=\"linecontourplot\"></div>\n</div>\n";
  var additional = "\n<input class=\"card-title\" spellcheck=\"false\"  style=\"".concat(css.plotTitle, " color:orange;\" value=\"\">\n");

  var linecontourplot = /*#__PURE__*/function (_plotframe) {
    _inherits(linecontourplot, _plotframe);

    var _super = _createSuper(linecontourplot);

    function linecontourplot(data) {
      var _this;

      _classCallCheck(this, linecontourplot);

      _this = _super.call(this);
      _this.width = 400;

      _this.accessor = function () {};

      _this.data = {
        current: undefined,
        datum: undefined,
        tasks: undefined
      };
      _this.lastselected = undefined;
      _this.tooltips = [];

      var obj = _assertThisInitialized(_this);

      obj.data = data; // Add another title input.

      var header = obj.node.querySelector("div.card-header");
      header.appendChild(html2element(additional)); // Append the plot backbone.

      var container = obj.node.querySelector("div.card-body");
      container.appendChild(html2element(template$2)); // Add a linecontourplot inset. When initialising already pass in the card size.

      obj.svgobj = new twoInteractiveAxesInset([]);
      container.querySelector("div.linecontourplot").appendChild(obj.svgobj.node);

      obj.svgobj.onupdate = function () {
        obj.draw();
      }; // function
      // Change the initial title


      obj.node.querySelector("input.card-title").value = "Contours";
      return _this;
    } // constructor


    _createClass(linecontourplot, [{
      key: "repaint",
      value: function repaint() {
        var obj = this; // The repaint here has to update the data also.

        obj.update();
      } // repaint

    }, {
      key: "update",
      value: function update() {
        // Update this plot.
        var obj = this;
        obj.svgobj.update();
        obj.draw();
      } // update

    }, {
      key: "updatedata",
      value: function updatedata(contour) {
        // The data object may allow several different contours to be plotted, but the 'contour' here specifies which one this plot should select.
        var obj = this;
        obj.accessor = contour.accessor;
        var xVariable = new variableobj({
          name: "x",
          extent: contour.extent.x
        });
        var yVariable = new variableobj({
          name: "y",
          extent: contour.extent.y
        }); // First update the menu current selection, so that whenthe items are updated the current option will be automatically assigned.

        obj.svgobj.x.menu.current = xVariable;
        obj.svgobj.y.menu.current = yVariable;
        obj.svgobj.x.update([xVariable]);
        obj.svgobj.y.update([yVariable]);
      } // updatedata

    }, {
      key: "getpath",
      value: function getpath(linedata) {
        var obj = this;
        var xaxis = obj.svgobj.x;
        var yaxis = obj.svgobj.y;
        var p = path();
        var d = linedata.points;
        p.moveTo(xaxis.scale(d[0][0]), yaxis.scale(d[0][1]));

        for (var i = 1; i < d.length; i++) {
          p.lineTo(xaxis.scale(d[i][0]), yaxis.scale(d[i][1]));
        } // for


        return p.toString();
      } // getpath

    }, {
      key: "draw",
      value: function draw() {
        // This should only draw a very specific item. But the config is precomputed anyway.
        var obj = this; // Display the name in the title.

        var titles = obj.node.querySelectorAll("input.card-title");
        titles[0].value = obj.data.current ? obj.data.current.metadata.name[0] : "";
        titles[1].value = obj.data.datum ? obj.data.datum.metadata.name[0] : ""; // Keep track of the latest selected?

        obj.lastselected = obj.data.current ? obj.data.current : obj.lastselected; // g.datum, g.data

        obj.drawdata(obj.lastselected, "g.data", function (d) {
          return d.color;
        });
        obj.drawdata(obj.data.datum, "g.datum", function () {
          return "orange";
        });
        obj.removetooltip();
      } // draw

    }, {
      key: "drawdata",
      value: function drawdata(data, gselector, coloraccessor) {
        var obj = this;

        if (data) {
          var lines = select(obj.node).select(gselector).selectAll("path").data(obj.accessor(data)); // First exit.

          lines.exit().remove(); // Then update

          lines.attr("d", function (d) {
            return obj.getpath(d);
          }).attr("stroke", coloraccessor).attr("stroke-width", function (d) {
            return d.lineWidth ? d.lineWidth : 1;
          }); // Finally add new lines.

          lines.enter().append("path").attr("stroke-width", function (d) {
            return d.lineWidth ? d.lineWidth : 1;
          }).attr("stroke", coloraccessor).attr("fill", "none").attr("d", function (d) {
            return obj.getpath(d);
          }).on("mouseenter", function (e, d) {
            e.target.setAttribute("stroke-width", 2);
            obj.placetooltip(e, d);
          }).on("mouseout", function (e, d) {
            e.target.setAttribute("stroke-width", 1);
          }); // on
        } else {
          select(obj.node).select(gselector).selectAll("path").remove();
        } // if

      } // drawdata

    }, {
      key: "placetooltip",
      value: function placetooltip(e, d) {
        // The event gives the point where the tooltip should be placed, but it should be oriented using the data.
        var obj = this; // Find the svg position of the event.

        var svgbox = obj.svgobj.node.querySelector("svg").getBoundingClientRect();
        var plotbox = obj.svgobj.plotbox;
        var xpx = e.clientX - svgbox.x - plotbox.x[0];
        var ypx = e.clientY - svgbox.y - plotbox.y[0]; // The scales to convert between pixel and data.

        var xaxis = obj.svgobj.x;
        var yaxis = obj.svgobj.y; // Now find the slope next to that point by first finding hte index of the closest point.

        var i_event = d.points.reduce(function (i_closest, v, i) {
          var currentclosest = d.points[i_closest];
          var current = d.points[i];
          var d0 = Math.pow(xpx - xaxis.scale(currentclosest[0]), 2) + Math.pow(ypx - yaxis.scale(currentclosest[1]), 2);
          var d1 = Math.pow(xpx - xaxis.scale(current[0]), 2) + Math.pow(ypx - yaxis.scale(current[1]), 2);
          return d1 < d0 ? i : i_closest;
        }, 0); // Calculate the local slope.

        var angle = Math.atan((d.points[i_event][1] - d.points[i_event + 1][1]) / (d.points[i_event][0] - d.points[i_event + 1][0])) / Math.PI * 180;
        select(obj.node).select("g.markup").append("text").attr("x", xpx).attr("y", ypx).attr("font-size", "10px").attr("transform", "rotate(".concat(-angle, " ").concat(xpx, ",").concat(ypx, ")")).text(d.level);
      } // placetooltip

    }, {
      key: "removetooltip",
      value: function removetooltip() {
        // Maybe this on eis not needed on events, but just on redraws?
        var obj = this;
        select(obj.node).select("g.markup").selectAll("text").remove();
      } // removetooltip

    }]);

    return linecontourplot;
  }(plotframe); // linecontourplot

  var template$1 = "\n<div style=\"width: 400px; background-color: white;\">\n\t<div class=\"linedistributionplot\"></div>\n</div>\n";

  var linedistributionplot = /*#__PURE__*/function (_plotframe) {
    _inherits(linedistributionplot, _plotframe);

    var _super = _createSuper(linedistributionplot);

    function linedistributionplot(data) {
      var _this;

      _classCallCheck(this, linedistributionplot);

      _this = _super.call(this);
      _this.width = 400;
      _this.data = {
        current: undefined,
        datum: undefined,
        tasks: undefined
      };

      _this.accessor = function () {
        return {
          points: [[0, 0]]
        };
      };

      var obj = _assertThisInitialized(_this);

      obj.data = data; // Append the plot backbone.

      var container = obj.node.querySelector("div.card-body");
      container.appendChild(html2element(template$1)); // Add a linedistributionplot inset. When initialising already pass in the card size.

      obj.svgobj = new twoInteractiveAxesInset([]);
      container.querySelector("div.linedistributionplot").appendChild(obj.svgobj.node);

      obj.svgobj.onupdate = function () {
        obj.refresh();
      }; // function
      // Change the title


      obj.node.querySelector("input.card-title").value = "Distributions";
      return _this;
    } // constructor


    _createClass(linedistributionplot, [{
      key: "update",
      value: function update(tasks) {
        // Update this plot.
        var obj = this;
        obj.svgobj.update();
        obj.refresh();
      } // update

    }, {
      key: "updatedata",
      value: function updatedata(series) {
        // The data is configured on load. The plot only requires the variables to be passed in....
        var obj = this; // Selectthe relevant series manually here for now.		

        obj.accessor = series.accessor;
        var xVariable = new variableobj({
          name: "s",
          extent: series.extent.x
        });
        var yVariable = new variableobj({
          name: series.name,
          extent: series.extent.y
        }); // First update the menu current selection, so that whenthe items are updated the current option will be automatically assigned.

        obj.svgobj.x.menu.current = xVariable;
        obj.svgobj.y.menu.current = yVariable;
        obj.svgobj.x.update([xVariable]);
        obj.svgobj.y.update([yVariable]);
        obj.draw();
      } // updatedata

    }, {
      key: "getcolor",
      value: function getcolor(task, defaultcolor) {
        var obj = this; // If a current is prescribed, then any other ones should be gray.
        // If a current is prescribed

        if (!defaultcolor) {
          defaultcolor = obj.accessor(task).color;
        } // if


        var c = obj.data.current ? obj.data.current == task ? defaultcolor : "gainsboro" : defaultcolor;
        c = obj.data.datum == task ? "orange" : c;
        return c;
      } // getcolor

    }, {
      key: "getpath",
      value: function getpath(task) {
        var obj = this;
        var xaxis = obj.svgobj.x;
        var yaxis = obj.svgobj.y;
        var p = path();
        var d = obj.accessor(task).points;
        p.moveTo(xaxis.scale(d[0][0]), yaxis.scale(d[0][1]));

        for (var i = 1; i < d.length; i++) {
          p.lineTo(xaxis.scale(d[i][0]), yaxis.scale(d[i][1]));
        } // for


        return p.toString();
      } // getpath

    }, {
      key: "draw",
      value: function draw() {
        // This just creates the lines, and removes redundant ones. The updating is done in refresh.
        var obj = this;
        var lines = select(obj.node).select("g.data").selectAll("path").data(obj.data.subset.value); // First exit.

        lines.exit().remove(); // Finally add new lines.

        lines.enter().append("path").attr("stroke-width", 2).attr("fill", "none").on("mouseenter", function (e, d) {
          // Place a label next to the target.
          // obj.data.current = d;
          obj.data.setcurrent(d);
          obj.data.repaint();
        }).on("mouseout", function (e, d) {
          // obj.data.current = undefined;
          obj.data.setcurrent(undefined);
          obj.data.repaint();
        }).on("click", function (e, d) {
          // obj.data.datum = obj.data.datum == d ? undefined : d;
          obj.data.selecttask(d);
          obj.data.repaint();
        });
        obj.refresh();
      } // draw

    }, {
      key: "repaint",
      value: function repaint() {
        var obj = this;
        var paths = select(obj.node).select("g.data").selectAll("path");
        paths.attr("stroke", function (d) {
          return obj.getcolor(d, undefined);
        }); // If there is a current element selected it should be raised.

        if (obj.data.current || obj.data.datum) {
          paths.filter(function (d) {
            return [obj.data.current, obj.data.datum].includes(d);
          }).each(function (d, i, el) {
            // When the element is raised it is repositioned the mouseout etc events to be triggered...
            el[0].parentElement.insertBefore(el[0], null);
          });
        } // if	

      } // repaint

    }, {
      key: "refresh",
      value: function refresh() {
        var obj = this; // console.log("refresh")

        select(obj.node).select("g.data").selectAll("path").attr("d", function (d) {
          return obj.getpath(d);
        });
        obj.repaint();
      } // refresh

    }]);

    return linedistributionplot;
  }(plotframe); // linedistributionplot

  /*Should this be a separate plot maybe? And a plot that allows interactions? So it shows all the triangles, and all the radial contractions, and it allows the user to select using it? */

  var TriangleIconGroup = /*#__PURE__*/function () {
    // This class should also display two designs at teh same time, using hte same color scheme (or similar) as the contour plot.
    // This is just an icon subplot, and it may be hosted on hte same svg with other subplots. Therefore it is drawn into a prescribed box.
    function TriangleIconGroup(data, accessor, xscale, yscale) {
      _classCallCheck(this, TriangleIconGroup);

      this.triangles = [];
      var obj = this;
      obj.data = data;
      obj.accessor = accessor; // Calculate the scale to use for drawing.

      obj.xscale = xscale;
      obj.yscale = yscale; // The translate is required to allow the plot to be drawn with a single scale.

      obj.node = svg2element("<g></g>");
    } // constructor


    _createClass(TriangleIconGroup, [{
      key: "update",
      value: function update() {
        // redraw the triangles.
        var obj = this; // First remove all existing triangles.

        obj.remove(); // Now create new ones.

        obj.triangles = obj.data.subset.value.map(function (task) {
          var triangle = new TriangleIcon(task, obj.accessor, obj.xscale, obj.yscale);
          obj.node.appendChild(triangle.node);

          triangle.node.onmouseenter = function () {
            obj.onmouseenter(task);
          }; // onmouseenter


          triangle.node.onclick = function () {
            obj.onclick(task);
          }; // onclick


          return triangle;
        });
      } // update

    }, {
      key: "repaint",
      value: function repaint(selected) {
        var obj = this;
        obj.triangles.forEach(function (t) {
          var color = "gainsboro";
          var textflag = false;

          if (t.task == obj.data.current || t.task == obj.data.datum) {
            color = t.task == obj.data.current ? "cornflowerblue" : "orange";
            t.node.parentElement.insertBefore(t.node, null);
            textflag = t.task == obj.data.current;
          } // if


          t.highlight(color, textflag);
        });
        /*
        obj.triangles.filter(t=>selected.includes(t.task)).forEach(function(t){
             t.highlight("black", true);
          t.node.parentElement.insertBefore(t.node,null)
           })
        */
      } // repaint

    }, {
      key: "remove",
      value: function remove() {
        var obj = this;
        obj.triangles.forEach(function (t) {
          t.remove();
        }); // forEach

        obj.triangles = [];
      } // remove
      // Dummy

    }, {
      key: "onmouseenter",
      value: function onmouseenter(selected) {} // onmouseenter

    }, {
      key: "onclick",
      value: function onclick(selected) {} // onclick

    }]);

    return TriangleIconGroup;
  }(); // TriangleIconGroup

  function generatorLine(name, x1, y1, x2, y2, dx, dy, ndx, ndy) {
    // Floor the values to the nearest pixel to avoid smearing?
    var x1_ = Math.floor(x1 + dx);
    var y1_ = Math.floor(y1 + dy);
    var x2_ = Math.floor(x2 + dx);
    var y2_ = Math.floor(y2 + dy); // Text positioning.
    // let L = Math.sqrt( (y2-y1)**2 + (x2-x1)**2 );
    // L = L>0 ? L : 1;
    // let normal = [ (y2-y1)/L, (x2-x1)/L ];

    var tx = (x1_ + x2_) / 2 + ndx;
    var ty = (y1_ + y2_) / 2 + ndy;
    var angle = Math.atan((y2 - y1) / (x2 - x1)) * 180 / Math.PI; // 0/0=NaN

    angle = angle ? angle : 0;
    return "<line stroke=\"gainsboro\" stroke-width=2 marker-end=\"url(#arrow-inactive)\" x1=\"".concat(x1_, "\" y1=\"").concat(y1_, "\" x2=\"").concat(x2_, "\" y2=\"").concat(y2_, "\"></line>\n\t<text text-anchor=\"middle\" style=\"display: none;\" transform=\"translate(").concat(tx, ", ").concat(ty, ") rotate(").concat(angle, ")\">").concat(name, "</text>");
  } // generatorLine


  function numformat(v) {
    return parseFloat(v.toFixed(3));
  }

  var TriangleIcon = /*#__PURE__*/function () {
    // Horizontal spacing between the U and Vtheta lines.
    function TriangleIcon(task, accessor, xscale, yscale) {
      _classCallCheck(this, TriangleIcon);

      this.spacing = 3;
      var obj = this;
      obj.task = task;
      var d = accessor(obj.task);
      var nameVx = "Vx=".concat(numformat(d.Vx));
      var nameVtheta = "Vtheta=".concat(numformat(d.Vtheta));
      var nameV = "V=".concat(numformat(Math.sqrt(Math.pow(d.Vx, 2) + Math.pow(d.Vtheta, 2))));
      var nameU = "U=".concat(numformat(d.U));
      var nameVrel = "Vrel=".concat(numformat(Math.sqrt(Math.pow(d.Vx, 2) + Math.pow(-d.U + d.Vtheta, 2))));
      obj.node = svg2element("<g>  \n\t    ".concat(generatorLine(nameVx, xscale(0), yscale(0), xscale(d.Vx), yscale(0), 0, 0, 0, 0), "\n\t    ").concat(generatorLine(nameVtheta, xscale(0), yscale(0), xscale(0), yscale(d.Vtheta), xscale(d.Vx) - xscale(0) - obj.spacing, 0, -12, 0), "\n\t\t").concat(generatorLine(nameV, xscale(0), yscale(0), xscale(d.Vx), yscale(d.Vtheta), 0, 0, 0, 0), "\n\t\t").concat(generatorLine(nameU, xscale(0), yscale(0), xscale(0), yscale(d.U), xscale(d.Vx) - xscale(0) + obj.spacing, yscale(-d.U + d.Vtheta) - yscale(0), 0, 0), "\n\t\t").concat(generatorLine(nameVrel, xscale(0), yscale(0), xscale(d.Vx), yscale(-d.U + d.Vtheta), 0, 0, 0, 0), "\n\t\t</g>"));
      obj.lines = obj.node.querySelectorAll("line");
      obj.labels = obj.node.querySelectorAll("text");
    } // constructor


    _createClass(TriangleIcon, [{
      key: "highlight",
      value: function highlight(color, textflag) {
        var obj = this;

        for (var i = 0; i < obj.lines.length; i++) {
          obj.lines[i].style.stroke = color;
          obj.lines[i].setAttribute("marker-end", "url(#arrow-".concat(color, ")"));
          obj.labels[i].style.display = textflag ? "" : "none";
        } // for

      } // repaint

    }, {
      key: "remove",
      value: function remove() {
        this.node.remove();
      } // remove

    }]);

    return TriangleIcon;
  }(); // TriangleIcon

  /*Should this be a separate plot maybe? And a plot that allows interactions? So it shows all the triangles, and all the radial contractions, and it allows the user to select using it? */

  var RadialIconGroup = /*#__PURE__*/function () {
    // This class should also display two designs at teh same time, using hte same color scheme (or similar) as the contour plot.
    // This is just an icon subplot, and it may be hosted on hte same svg with other subplots. Therefore it is drawn into a prescribed box.
    function RadialIconGroup(data, accessor, xscale, yscale) {
      _classCallCheck(this, RadialIconGroup);

      this.icons = [];
      var obj = this;
      obj.data = data;
      obj.accessor = accessor; // Calculate the scale to use for drawing.

      obj.xscale = xscale;
      obj.yscale = yscale; // The translate is required to allow the plot to be drawn with a single scale.

      obj.node = svg2element("<g>\n\t  <text class=\"cornflowerblue\" fill=\"cornflowerblue\" text-anchor=\"middle\" x=-10 y=-10></text>\n\t  <text class=\"orange\" fill=\"orange\" text-anchor=\"middle\" x=-10 y=-10></text>\n\t</g>");
    } // constructor


    _createClass(RadialIconGroup, [{
      key: "update",
      value: function update() {
        // redraw the triangles.
        var obj = this; // First remove all existing triangles.

        obj.remove(); // Now create new ones.

        obj.icons = obj.data.subset.value.map(function (task) {
          var icon = new RadialIcon(task, obj.accessor, obj.xscale, obj.yscale);
          obj.node.appendChild(icon.node);

          icon.node.onmouseenter = function () {
            obj.onmouseenter(task);
          }; // onmouseenter


          return icon;
        });
        obj.node.querySelector("text.cornflowerblue").setAttribute("x", obj.xscale(0.5));
        obj.node.querySelector("text.cornflowerblue").setAttribute("y", obj.yscale(0) - 15);
        obj.node.querySelector("text.orange").setAttribute("x", obj.xscale(0.5));
        obj.node.querySelector("text.orange").setAttribute("y", obj.yscale(0) + 15);
      } // update

    }, {
      key: "repaint",
      value: function repaint() {
        var obj = this;
        obj.node.querySelector("text.orange").textContent = "";
        obj.node.querySelector("text.cornflowerblue").textContent = "";
        obj.icons.forEach(function (t) {
          // If design is current it should be in blue, if datum orange, and if not gainsboro.
          var color = "gainsboro";

          if (t.task == obj.data.current || t.task == obj.data.datum) {
            color = t.task == obj.data.current ? "cornflowerblue" : "orange";
            obj.node.querySelector("text.".concat(color)).textContent = obj.accessor(t.task).toFixed(3);
            t.node.parentElement.insertBefore(t.node, null);
          } // if


          t.highlight(color);
        });
        /* For an array of selected tasks
        obj.icons.filter(t=>selected.includes(t.task)).forEach(function(t){
             t.highlight("black", true);
          t.node.parentElement.insertBefore(t.node,null)
           })
        */
      } // repaint

    }, {
      key: "remove",
      value: function remove() {
        var obj = this;
        obj.icons.forEach(function (t) {
          t.remove();
        }); // forEach

        obj.icons = [];
      } // remove
      // Dummy

    }, {
      key: "onmouseenter",
      value: function onmouseenter(selected) {} // onmouseenter

    }]);

    return RadialIconGroup;
  }(); // RadialIconGroup

  var RadialIcon = /*#__PURE__*/function () {
    // Horizontal spacing between the U and Vtheta lines.
    function RadialIcon(task, accessor, xscale, yscale) {
      _classCallCheck(this, RadialIcon);

      this.spacing = 3;
      var obj = this;
      obj.task = task;
      var d = accessor(obj.task);
      obj.node = svg2element("<path\n\t\t\tfill=\"none\" stroke=\"gainsboro\" stroke-width=\"2\"\n\t\t\td=\"\n\t\t\tM".concat(xscale(0), " ").concat(yscale(-1), "\n\t\t\tL").concat(xscale(0), " ").concat(yscale(1), "\n\t\t\tL").concat(xscale(1), " ").concat(yscale(d), "\n\t\t\tL").concat(xscale(1), " ").concat(yscale(-d), "\n\t\t\tL").concat(xscale(0), " ").concat(yscale(-1), "\"\n\t\t></path>").replace(/[\n\r]+/g, ' '));
    } // constructor


    _createClass(RadialIcon, [{
      key: "highlight",
      value: function highlight(color, textflag) {
        var obj = this;
        obj.node.style.stroke = color;
      } // repaint

    }, {
      key: "remove",
      value: function remove() {
        this.node.remove();
      } // remove

    }]);

    return RadialIcon;
  }(); // RadialIcon

  var generatorMarker = function generatorMarker(aspectRatio, size, name, color) {
    return "<marker\n          id=\"".concat(name, "\"\n          viewBox=\"0 0 ").concat(aspectRatio * 5, " 5\"\n          refX=\"").concat(aspectRatio * 5, "\"\n          refY=\"2.5\"\n          markerWidth=\"").concat(size, "\"\n          markerHeight=\"").concat(size, "\"\n          orient=\"auto-start-reverse\">\n          shape-rendering=\"auto\"\n          <path fill=\"").concat(color, "\" d=\"M 0 0 L ").concat(aspectRatio * 5, " 2.5 L 0 5 z\" />\n     </marker>");
  }; // generatorMarker
  // The template can now hold one inset per div let's say. Maybe here I want to include a modelInputVariableSelectionInset and a twoInteractiveAxesInset. The drawing on the svg should be implemented here.


  var template = "\n<svg width=400 height=400>\n  <defs>\n    <!-- Markers to be used as an arrowhead -->\n    ".concat(generatorMarker(2, 10, "arrow-cornflowerblue", "cornflowerblue"), "\n\t").concat(generatorMarker(2, 10, "arrow-orange", "orange"), "\n    ").concat(generatorMarker(2, 10, "arrow-gainsboro", "gainsboro"), "\t\n  </defs>\n  \n  <g class=\"background\"></g>\n  <g class=\"current\"></g>\n  <g class=\"lastselected\"></g>\n  \n</svg>\n");

  var iconplot = /*#__PURE__*/function (_plotframe) {
    _inherits(iconplot, _plotframe);

    var _super = _createSuper(iconplot);

    function iconplot(data) {
      var _this;

      _classCallCheck(this, iconplot);

      _this = _super.call(this);
      _this.width = 400;

      _this.accessor = function () {};

      _this.data = {
        current: undefined,
        datum: undefined,
        tasks: undefined
      };
      _this.lastselected = undefined;
      _this.facets = [1, 1, 1];

      var obj = _assertThisInitialized(_this); // Data is a dataStorage item.


      obj.data = data; // Append the plot backbone.

      obj.svg = svg2element(template);
      var container = obj.node.querySelector("div.card-body");
      container.appendChild(obj.svg); // The scales. All scales need to have a unit aspect ratio of 1. This should be determined here. So scales can be made inside, but domains are governed from here.

      obj.scales(obj.facets);
      obj.inlet = new TriangleIconGroup(obj.data, function (task) {
        return task.icons.inlet;
      }, function (v) {
        return -5;
      }, function (v) {
        return -5;
      });
      obj.svg.querySelector("g.background").appendChild(obj.inlet.node);
      obj.radial = new RadialIconGroup(obj.data, function (task) {
        return task.icons.radial;
      }, function (v) {
        return -5;
      }, function (v) {
        return -5;
      });
      obj.svg.querySelector("g.background").appendChild(obj.radial.node);
      obj.outlet = new TriangleIconGroup(obj.data, function (task) {
        return task.icons.outlet;
      }, function (v) {
        return -5;
      }, function (v) {
        return -5;
      });
      obj.svg.querySelector("g.background").appendChild(obj.outlet.node);

      function coordinating(selected) {
        obj.data.setcurrent(selected);
        obj.data.repaint();
      } // coordinating


      obj.inlet.onmouseenter = coordinating;
      obj.radial.onmouseenter = coordinating;
      obj.outlet.onmouseenter = coordinating;

      function selectdatum(selected) {
        obj.data.selecttask(selected);
        obj.data.repaint();
      } // selectdatum


      obj.inlet.onclick = selectdatum;
      obj.radial.onclick = selectdatum;
      obj.outlet.onclick = selectdatum; // Change the initial title

      obj.node.querySelector("input.card-title").value = "Icons";
      console.log(obj);
      return _this;
    } // constructor
    // A function to partition hte plot and return coherent scales.


    _createClass(iconplot, [{
      key: "scales",
      value: function scales(widths) {
        var obj = this; // Partition the plot into facets, and create corresponding scales. There will be three facets by default, and the first and third need to have a consistent y scale.

        var w = 400;
        var h = 400;
        var margin = 10;
        var dw = w / widths.reduce(function (a, v) {
          return a + v;
        }, 0); // Calculate the value/pixel for all 4 axes that need to be coordinated.

        var facetwidths = [widths[0] * dw - 2 * margin, widths[2] * dw - 2 * margin, h - 2 * margin];
        var domains = obj.data.subset.value.reduce(function (acc, t) {
          acc[0][0] = Math.min(acc[0][0], t.icons.inlet.Vx);
          acc[0][1] = Math.max(acc[0][1], t.icons.inlet.Vx);
          acc[1][0] = Math.min(acc[1][0], t.icons.outlet.Vx);
          acc[1][1] = Math.max(acc[1][1], t.icons.outlet.Vx);
          acc[2][0] = Math.min(acc[2][0], t.icons.inlet.Vtheta - t.icons.inlet.U, t.icons.outlet.Vtheta - t.icons.outlet.U);
          acc[2][1] = Math.max(acc[2][1], t.icons.inlet.Vtheta, t.icons.outlet.Vtheta); // radial - here just the maximum value is needed.

          acc[3] = Math.max(acc[3], t.icons.radial);
          return acc;
        }, [[0, Number.NEGATIVE_INFINITY], [0, Number.NEGATIVE_INFINITY], [0, Number.NEGATIVE_INFINITY], Number.NEGATIVE_INFINITY]); // Calculate the value per pixel, and select the smallest one.

        var valPerPx = Math.max.apply(Math, _toConsumableArray([0, 1, 2].map(function (i) {
          return (domains[i][1] - domains[i][0]) / facetwidths[i];
        }))); // Now re-establish the domains. Make the data centered.

        var xdomainin = [(domains[0][0] + domains[0][1]) / 2 - 1 / 2 * valPerPx * widths[0] * dw, (domains[0][0] + domains[0][1]) / 2 + 1 / 2 * valPerPx * widths[0] * dw];
        var xdomainout = [(domains[1][0] + domains[1][1]) / 2 - 1 / 2 * valPerPx * widths[2] * dw, (domains[1][0] + domains[1][1]) / 2 + 1 / 2 * valPerPx * widths[2] * dw];
        var ydomain = [(domains[2][0] + domains[2][1]) / 2 - 1 / 2 * valPerPx * h, (domains[2][0] + domains[2][1]) / 2 + 1 / 2 * valPerPx * h];
        var sum = 0;
        var ranges = widths.map(function (v, i) {
          sum += v * dw;
          return [sum - v * dw + margin, sum - margin];
        }); // Scales for the triangles

        var inletxscale = new ScaleLinear();
        inletxscale.range = ranges[0];
        inletxscale.domain = xdomainin;
        var outletxscale = new ScaleLinear();
        outletxscale.range = ranges[2];
        outletxscale.domain = xdomainout;
        var yscale = new ScaleLinear();
        yscale.range = [0, h];
        yscale.domain = ydomain; // Scales for the radial contraction icon. This should be easier, no need to coordinate anything.

        var radialxscale = new ScaleLinear();
        radialxscale.range = ranges[1];
        radialxscale.domain = [0, 1]; // flags for inlet/outlet

        var radialyscale = new ScaleLinear();
        radialyscale.range = [h / 4, 3 * h / 4];
        radialyscale.domain = [-domains[3], domains[3]]; // flags for inlet/outlet
        // Scales for the radial contraction icon.

        return {
          inlet: {
            x: inletxscale,
            y: yscale
          },
          radial: {
            x: radialxscale,
            y: radialyscale
          },
          outlet: {
            x: outletxscale,
            y: yscale
          }
        }; // scales
      } // scales

    }, {
      key: "repaint",
      value: function repaint() {
        // This is called when the datum design, or the currently inspected designs change.
        var obj = this;
        obj.inlet.repaint();
        obj.radial.repaint();
        obj.outlet.repaint();
      } // repaint
      // When is this update actually called??

    }, {
      key: "draw",
      value: function draw() {
        // Called when subset is changed
        var obj = this;
        obj.inlet.update();
        obj.radial.update();
        obj.outlet.update();
      } // update

    }, {
      key: "update",
      value: function update() {
      } // update

    }, {
      key: "updatedata",
      value: function updatedata() {
        // When the data is updated the scales need to be redone, and reassigned.
        var obj = this;
        var scales = obj.scales(obj.facets);

        obj.inlet.xscale = function (v) {
          return scales.inlet.x.val2px(v);
        };

        obj.inlet.yscale = function (v) {
          return scales.inlet.y.val2px(v);
        };

        obj.radial.xscale = function (v) {
          return scales.radial.x.val2px(v);
        };

        obj.radial.yscale = function (v) {
          return scales.radial.y.val2px(v);
        };

        obj.outlet.xscale = function (v) {
          return scales.outlet.x.val2px(v);
        };

        obj.outlet.yscale = function (v) {
          return scales.outlet.y.val2px(v);
        };

        obj.inlet.update();
        obj.radial.update();
        obj.outlet.update();
      } // updatedata
      // Should the insets have a g that is on top of everything, and on interactions copy the triangle there? That shouldn't destroy the interactions either I think.

    }]);

    return iconplot;
  }(plotframe); // iconplot

  // SCATTERPLOT, quasi-CONTOURPLOT (really a lineplot), LINEPLOT
  // First add in the collapsible frames, and their toggle buttons.

  CollapsibleFrame.AddStyle();
  var geometry = new CollapsibleFrame("Geometry");
  var flow = new CollapsibleFrame("Flow");
  var details = new CollapsibleFrame("Details");
  var header = document.getElementById("header");
  var body = document.getElementById("plotcontainer");
  var coordinate = [geometry, flow, details];
  coordinate.forEach(function (frm) {
    header.appendChild(frm.button);
    body.appendChild(frm.folder);

    frm.button.onclick = function (e) {
      coordinate.forEach(function (cfrm) {
        return cfrm.update(frm == cfrm);
      });
    }; // function

  }); // forEach
  // On window change the currentlz active folder should be activated again to extend it.

  window.onresize = function () {
    coordinate.forEach(function (cfrm) {
      return cfrm.update(cfrm.active);
    });
  }; // onresize
  // How do I subscribe the regular plots to just the subset data? Do I just hardcode it so? Or do I subscribe them to it also?
  // Instantiate the data.


  var data = new dataStorage();
  console.log(data); // Data storage applies the filtering also, and precomputes a subset. Whenever the subset changes the plots should repaint, but also any header titles should adjust.

  data.subset.subscribe(function () {
    geometry.label("(".concat(data.tasks.length, ")"));
    flow.label("(".concat(data.tasks.length, ")"));
    details.label("(".concat(data.subset.value.length, ")"));
  }); // subscribe
  // PLOTS

  function addPlot(p, folder) {
    folder.appendChild(p.node);
    p.update();
    data.plots.push(p);
  } // addPlot
  // FILTERING PLOTS.
  // Add some geometry histograms.


  var fTC = new filterhistgoram(data);
  addPlot(fTC, geometry.folder);
  var fSC = new filterhistgoram(data);
  addPlot(fSC, geometry.folder);
  var fPC = new filterhistgoram(data);
  addPlot(fPC, geometry.folder); // Add a scatterplot as a filtering plot prototype.
  // Why do the filtering plots need to be available to filtering?

  var fsp = new filterscatterplot(data);
  addPlot(fsp, flow.folder);
  var fh = new filterhistgoram(data);
  addPlot(fh, flow.folder); // ICON plot

  var ip = new iconplot(data);
  addPlot(ip, details.folder);
  data.subset.subscribe(function () {
    ip.draw();
  }); // FLOW DETAIL PLOTS:

  var lc = new linecontourplot(data);
  addPlot(lc, details.folder);
  data.subset.subscribe(function () {
    lc.draw();
  });
  var sp = new scatterplot(data);
  addPlot(sp, details.folder);
  data.subset.subscribe(function () {
    sp.draw();
  });
  var lp_mach = new linedistributionplot(data);
  addPlot(lp_mach, details.folder);
  data.subset.subscribe(function () {
    lp_mach.draw();
  });
  var lp_camber = new linedistributionplot(data);
  addPlot(lp_camber, details.folder);
  data.subset.subscribe(function () {
    lp_camber.draw();
  });
  var lp_theta = new linedistributionplot(data);
  addPlot(lp_theta, details.folder);
  data.subset.subscribe(function () {
    lp_theta.draw();
  }); // ADD DRAG AND DROP FOR DATA

  var dataLoader = new dragDropHandler();

  dataLoader.ondragdropped = function (loadeddata) {
    // Make some dummy test data here!
    var Vx_base = 5;
    var Vtheta_base = 2;
    var U_base = 8;
    loadeddata.forEach(function (t) {
      t.icons = {
        inlet: {
          Vx: Vx_base + Math.random(),
          Vtheta: Vtheta_base + Math.random(),
          U: U_base + Math.random()
        },
        radial: 1 - Math.random() / 10,
        outlet: {
          Vx: Vx_base + Math.random(),
          Vtheta: Vtheta_base + 4 + Math.random(),
          U: U_base + Math.random()
        }
      }; // icons
    }); // forEach
    // This replaces the 'ondragdropped' function of the data loader, which executes whn the new data becomes available.

    data.add(loadeddata); // Filtering plots

    fTC.updatedata();
    fSC.updatedata();
    fPC.updatedata();
    fsp.updatedata();
    fh.updatedata(); // Load the data in and assign the series.

    sp.updatedata();
    lc.updatedata(data.contours[0]);
    lp_mach.updatedata(data.distributions[0]);
    lp_camber.updatedata(data.distributions[1]);
    lp_theta.updatedata(data.distributions[2]); // Update the icon plot.

    ip.updatedata();
  }; // ondragdropped
  // DRAGGING AND DROPPING THE DATA IS A DEVELOPMENT FEATURE.


  document.body.ondrop = function (ev) {
    dataLoader.ondrop(ev);
  };

  document.body.ondragover = function (ev) {
    dataLoader.ondragover(ev);
  }; // Turn the details on by default. At the end so that the content has some height.


  details.update(true); // Dev test dataset.

  dataLoader.loadfiles(["./assets/data/M95A60SC80TC4_psi040A95_t_c_Axt.json"]);

}());
//# sourceMappingURL=app.js.map
