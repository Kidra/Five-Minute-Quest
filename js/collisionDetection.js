function collisionDetection(sprite1, sprite2)
{
  var left1;
  var left2;
  var right1;
  var right2;
  var top1;
  var top2;
  var bottom1;
  var bottom2;
  
  var intersect=true;
  var collision=false;
  
  left1 = sprite1.x;
  left2 = sprite2.x;
  right1 = sprite1.x + sprite1.width;
  right2 = sprite2.x + sprite2.width;
  top1 = sprite1.y;
  top2 = sprite2.y;
  bottom1 = sprite1.y + sprite1.height;
  bottom2 = sprite2.y + sprite2.height;
  if (bottom1 < top2)
    intersect = false;
  if (top1 > bottom2)
    intersect = false;
  if (right1 < left2)
    intersect = false;
  if (left1 > right2)
    intersect = false;
  
  if (intersect == true)
  {
    //calculate the intersection rect
    var iY; // y point
    var iHeight; //intersect rect height
    var iX; // X point
    var iWidth; //intersect rect width
    if (bottom1 >= top2 && bottom1 <= bottom2)
    {
      iY = top2;
      iHeight = bottom1 - top2;
    }
    else
    {
      iY = top1;
      iHeight = bottom2 - top1;
    }
    
    if (right1 >= left2 && right1 <= right2)
    {
      iX = left2;
      iWidth = right1 - left2;
    }
    else
    {
      iX = left1;
      iWidth = right2 - left1;
    }
    if (iWidth > 0 && iHeight >0)
    {
      g.cctx.clearRect(0,0,g.width,g.height);
      g.cctx.drawImage(sprite1.cimg, sprite1.x,sprite1.y);
      g.cctx.drawImage(sprite2.cimg, sprite2.x,sprite2.y);
      //console.log({'x':iX, 'y':iY, 'w':iWidth, 'h':iHeight});
      //pixel perfect
      var Xtest = g.width - iX;
      var Ytest = g.height - iY;
      if (Xtest < iWidth)
        iWidth = Xtest;
      if (Ytest < iHeight)
        iHeight = Ytest;
      imageData = g.cctx.getImageData(iX,iY,iWidth, iHeight);
      for (var i=3; i<imageData.data.length; i=i+4)
      {
        if (imageData.data[i] > 128)
        {
          //console.log(imageData.data[i]);
          //clearInterval(intervalID);
          collision = true;
        }
      }
    }
  }
  return collision;
}