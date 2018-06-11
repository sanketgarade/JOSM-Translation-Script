// -*- coding: utf-8 -*-
//
//  translate.js
//  
//  Copyright 2016 Manu Varkey <manuvarkey@gmail.com>
//  
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation; either version 2 of the License, or
//  (at your option) any later version.
//  
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//  
//  You should have received a copy of the GNU General Public License
//  along with this program; if not, write to the Free Software
//  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//  MA 02110-1301, USA.
//  
//  


// CSV parse function
function parseCSV(str) {
    var arr = [];
    var quote = false;  // true means we're inside a quoted field

    // iterate over each character, keep track of current row and column (of the returned array)
    for (var row = col = c = 0; c < str.length; c++) {
        var cc = str[c], nc = str[c+1];        // current character, next character
        arr[row] = arr[row] || [];             // create a new row if necessary
        arr[row][col] = arr[row][col] || '';   // create a new column (start with empty string) if necessary

        // If the current character is a quotation mark, and we're inside a
        // quoted field, and the next character is also a quotation mark,
        // add a quotation mark to the current column and skip the next character
        if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }  

        // If it's just one quotation mark, begin/end quoted field
        if (cc == '"') { quote = !quote; continue; }

        // If it's a comma and we're not in a quoted field, move on to the next column
        if (cc == ',' && !quote) { ++col; continue; }

        // If it's a newline and we're not in a quoted field, move on to the next
        // row and move to column 0 of that new row
        if (cc == '\n' && !quote) { ++row; col = 0; continue; }

        // Otherwise, append the current character to the current column
        arr[row][col] += cc;
    }
    return arr;
}

// Binary search for 2D array
function binarySearch(arr, start, end, i) 
{
    var mid = Math.floor((end-start) / 2) + start;
    if (arr[mid][0].toLowerCase() == i.toLowerCase())
    {
        return mid;
    }
    else if (arr[mid][0].toLowerCase() < i.toLowerCase() && (end-start) > 1)
    {
        return binarySearch(arr, mid+1, end, i);
    }
    else if (arr[mid][0].toLowerCase() > i.toLowerCase() && (end-start) > 1)
    {
        return binarySearch(arr, start, mid-1, i);
    }
    else
    {
        return -1;
    }
}

// Open current dataset
var layers = require("josm/layers");
var dataset = layers.activeLayer.data

// Obtain all places
places = dataset.query("place=*");

// Alert user about number of places
josm.alert("Number of places :" + places.length);

// Read from Dictionary file
var txtFile = "/home/pced/JOSM/dict.csv"
var file_reader = new java.io.FileReader(txtFile);
var dict_txt = ""
var data = ""
data = file_reader.read();
while(data != -1)
{
    dict_txt = dict_txt + String.fromCharCode(data);
    data = file_reader.read();
}
file_reader.close();

// Populate Dictionary array
dict = parseCSV(dict_txt);

// Perform replacements
var skip = 0;
for (var i = 0; i < places.length; i++) 
{
    if(!places[i].get("name:ml") && places[i].get("name"))
    {
        var name = places[i].get("name")
        // search in dictionary
        index = binarySearch(dict,0,dict.length-1,name)
        if(index >= 0)
        {
            places[i].set("name:ml",dict[index][1]);
        }
        else
        {
            skip = skip + 1;
        }
    }
    else
    {
        skip = skip + 1;
    }
}

// Alert user about number of places translated
josm.alert("Finished setting tags for " + (places.length - skip) + " out of " + places.length + " nodes");
