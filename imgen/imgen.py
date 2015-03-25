from PIL import ImageFont
from PIL import Image
from PIL import ImageDraw
import csv
import sys

# Converts and renames images from images/ subdirectory based on index.csv.
# Example index.csv:
#   Team Num,Image Name
#   61,61.jpg
#   151,adfs.png
#   166,IM8230.jpg

font = ImageFont.truetype("arial.ttf", 20)

with open('index.csv') as indexfile:
    index = csv.DictReader(indexfile)
    for row in index:
      baseimgpath = 'images/'+row['Image Name']
      outpath = '../public/images/'+row['Team Num']+'.png'
      maxwidth=600.0 # Maximum width. Default is 600.0
      maxheight=540.0 # Maximum height. 60px is added at bottom, so 540 here will become 600.
      with Image.open(baseimgpath) as baseimg:
        if baseimg.size[0] > baseimg.size[1]:
          baseimg = baseimg.rotate(-90)
        if baseimg.size[0] > maxwidth:
          ratio = (maxwidth/baseimg.size[0])
          print str(baseimg.size)+" * "+str(ratio)
          newsize = (int(maxwidth),int(baseimg.size[1]*ratio)) # Resize the image to 600px wide
          print newsize
          baseimg = baseimg.resize(newsize)
        if baseimg.size[1] > maxheight:
          ratio = (maxheight/baseimg.size[1])
          print str(baseimg.size)+" * "+str(ratio)
          newsize = (int(baseimg.size[0]*ratio),int(maxheight)) # Resize the image to 540px tall
          print newsize
          baseimg = baseimg.resize(newsize,Image.ANTIALIAS)
        img = Image.new("RGBA", (baseimg.size[0],baseimg.size[1]+60), (230,230,230))
        img.paste(baseimg, (0,0,baseimg.size[0],baseimg.size[1]))
        draw = ImageDraw.Draw(img)

        basex=0
        basey=baseimg.size[1]+20
        draw.text((basex,basey),"Team Number"+": "+row['Team Num'],"black",font=font)

        print(baseimgpath, baseimg.size, outpath, img.size)
        img.save(outpath)
