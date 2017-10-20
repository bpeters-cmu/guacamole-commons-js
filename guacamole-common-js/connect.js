function connect(){
          // Get display div from document
          var display = document.getElementById("display");
          alert('start');

          var metas = document.getElementsByTagName('meta');


          token = metas[0].getAttribute("token")


          // Instantiate client, using an HTTP tunnel for communications.
          var guac = new Guacamole.Client(
              new Guacamole.WebSocketTunnel("ws://129.146.85.80:8291/?token=" + token)
          );

          // Add client to display div
          display.appendChild(guac.getDisplay().getElement());

          // Error handler
          guac.onerror = function(error) {
              alert(error);
          };
          alert('connecting');
          // Connect
          guac.connect();

          // Disconnect on close
          window.onunload = function() {
              guac.disconnect();
          }
      // Mouse
          var mouse = new Guacamole.Mouse(guac.getDisplay().getElement());
          mouse.onmousedown =
          mouse.onmouseup   =
          mouse.onmousemove = function(mouseState) {
              guac.sendMouseState(mouseState);
          };
          // Keyboard
          var keyboard = new Guacamole.Keyboard(document);
          keyboard.onkeydown = function (keysym) {
              guac.sendKeyEvent(1, keysym);
          };
          keyboard.onkeyup = function (keysym) {
              guac.sendKeyEvent(0, keysym);
          };
        }
