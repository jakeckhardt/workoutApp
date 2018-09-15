"use strict";

const axios = require("axios");
const jsdom = require("jsdom");
const fs = require("fs");
const { JSDOM } = jsdom;

let finalArray = [];

const getBodyBuildingResults = async (pageNumber) => {
  const response = await axios.get(`https://www.bodybuilding.com/exercises/finder/${pageNumber}/?`);
  const dom = new JSDOM(response.data);

  const itemArray = dom.window.document.getElementsByClassName("ExResult-row");
  for (var i = 0; i < itemArray.length; i++) {
    var item = itemArray[i];
    var workout = {};
    workout.title = item.querySelectorAll("h3")[0].querySelectorAll("a")[0].innerHTML.replace(/\s{2,}/g,'');
    workout.muscleTargeted = item.getElementsByClassName("ExResult-muscleTargeted")[0].querySelectorAll("a")[0].innerHTML.replace(/\s{2,}/g,'');
    workout.equipmentType = item.getElementsByClassName("ExResult-equipmentType")[0].querySelectorAll("a")[0].innerHTML.replace(/\s{2,}/g,'');
    workout.rating = item.getElementsByClassName("ExRating-badge")[0].innerHTML.replace(/\s{2,}/g,'');
    workout.imageOne = item.querySelectorAll("img")[0].getAttribute("data-src");
    workout.imageTwo = item.querySelectorAll("img")[1].getAttribute("data-src");
    finalArray.push(JSON.stringify(workout));
  }
  if (pageNumber === 15) {
    console.log(pageNumber);
    const finalArrayString = finalArray.toString();
    await fs.writeFile('workouts.json', finalArrayString, 'utf8');
  } else {
    getBodyBuildingResults(pageNumber + 1);
  }
}

getBodyBuildingResults(1);
