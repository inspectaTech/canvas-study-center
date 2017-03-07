function canvas_template(obj)
{
  //private properties
  var canvas = document.getElementById('study'),
  context_obj = canvas.getContext('2d'),
  width =  (obj != undefined && obj.width != undefined) ? obj.width : 640,
	height =  (obj != undefined && obj.height != undefined) ? obj.height : 480,
  current_state = "initial";//other state is modified
  var img_default = ["https://upload.wikimedi",
                             "a.org/wikipedia/pt",
                             "/b/b5/Snake_Eyes_po",
                             "r_Robert_Atkins.jpg"]
                             .join("");

  	//takes constructors url parameter or uses default above
  var img_url = (obj != undefined && obj.url != undefined) ? obj.url : img_default;

	//obj_globals canvas default variables
	var src_x = 0;
	var src_y = 5;
	var img_w = 500;
	var img_h = 500;
	var can_x = 0;
	var can_y = 0;
	var can_w = 500;
	var can_h = 500;

  //arrays and objects

  //an object that helps sustain other object properties i didn't
	//think of yet
  var obj_els = {};
  var image_object = new Image();


  var draw_me = function(mod) {

      //console.log("draw running");

          if (canvas.getContext) {


            image_object.onload=function(){

              //canvas data here
                canvas.width = width;
                canvas.height = height;

              if(current_state == "initial"){

                //study: this is the section to get the
                //images initial settings
                img_w = image_object.naturalWidth;
                img_h = image_object.naturalHeight;

                //for this to work without stretching
                //the last parameters have to match
                //the image parameters
                can_w = img_w;
                can_h = img_h;

                console.log(image_object.naturalWidth);
                console.log(image_object.naturalHeight);

                //center script
                can_x = (canvas.width - img_w) / 2;
                can_y = (canvas.height - img_h) / 2;

              }//end if


                context_obj.drawImage(image_object,
                                      src_x,  src_y,
                                      img_w, img_h,
                                      can_x, can_y,
                                      can_w, can_h);

            }//end onload//

						//find the src url
            image_object.src = img_url;
          }//end if


      }//end draw

      var center_me = function()
      {
        //my first attempt was this: but half the image
        //crossed over into the canvas phanthom zone
        //the bottome did the same - my numbers were
        //150 & -10
        //the canvs is set to 640 x 480 with the image set to
        //340 x 500 so its height of 500 would be 20px
        //too big for the canvas divided by 2 would end
        //with 10px overlapping the borders top and bottom.
        //but using the negative number the picture was
        //placed at the coordinate -10 which for the
        //image_src is 10 pixels down from the origin
        //to get above the origin you need positive
        //numbers in the image_src parameters.  The
        //same with the x axis. 150 was 150 to the
        //positive side of the origin or to the left
        //of the origin (outside the left margin)

        /*
        //first attempt

        src_x = (canvas.width - img_w) / 2;
        src_y = (canvas.height - img_h) / 2;
        */


        //next i tried this - using the src x & y
        //it came out centered but with a wall splitting
        //middle of the image - the canvas borders were
        //also position to fit the image so it would't
        //go out of ratio

        /*
        //second attempt

        src_x = ((canvas.width - img_w) / 2) * -1;
        src_y = ((canvas.height - img_h) / 2) * -1;
        */

        //knowing that what i call the canvas border
        //parameter is the problem i decided to move
        //the border position of the canvas instead of
        //src image position  but half the image ended
        //up in the no-zone to the left. - the "canvas
        //border" uses different numbers for positioning
        //in relation to the origin. whereas the image src
        //numbers i needed were negative numbers, here i
        //need positive numbers to position
        //within the canvas.

        /*
        //almost there attempt

        can_x = ((canvas.width - img_w) / 2) * -1;
        can_y = ((canvas.height - img_h) / 2) * -1;
        */

        //finally im here//

        can_x = (canvas.width - img_w) / 2;
        can_y = (canvas.height - img_h) / 2;

        current_state = "modified";
        draw_me("center");


      }//end center_me

      this.draw_me = function(){ draw_me();};


}//end canvas_template
