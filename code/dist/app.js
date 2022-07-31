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
        var obj = this; // We don't support dropping in several files - drag-and drop is only temporary.

        var file = files[0];
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

  var data = undefined; // Updatethe app.

  function update() {
    console.log("Update the app.", data);
  } // update


  var dataLoader = new dragDropHandler();

  dataLoader.ondragdropped = function (loadeddata) {
    // This replaces the 'ondragdropped' function of the data loader, which executes whn the new data becomes available.
    data = loadeddata;
    update();
  }; // ondragdropped
  // DRAGGING AND DROPPING THE DATA IS A DEVELOPMENT FEATURE.


  var dragDropArea = document.getElementsByTagName("BODY")[0];

  dragDropArea.ondrop = function (ev) {
    dataLoader.ondrop(ev);
  };

  dragDropArea.ondragover = function (ev) {
    dataLoader.ondragover(ev);
  }; // Dev test dataset.


  dataLoader.loadfiles(["./assets/data/M95A60SC80TC4_psi040A95.json"]);

}());
//# sourceMappingURL=app.js.map
