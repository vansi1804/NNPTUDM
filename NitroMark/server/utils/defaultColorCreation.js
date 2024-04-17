const Color = require("../models/colorModel");

async function findOrCreateColor(title) {
   try {
      // Assuming you have a function called findOrCreate in your Color model
      const color = await Color.findOrCreate({ title });
      console.log("Color:", color);
   } catch (error) {
      console.error("Error finding or creating color:", error);
   }
}

// Array of basic colors
const basicColors = [
   "Red",
   "Green",
   "Blue",
   "Yellow",
   "Orange",
   "Purple",
   "Brown",
   "Black",
   "White",
   "Gray",
];

async function createBasicColors() {
   for (const colorTitle of basicColors) {
      try {
         await Color.create({ title: colorTitle });
         console.log(`Color "${colorTitle}" created.`);
      } catch (error) {
         console.error(`Error creating color "${colorTitle}":`, error);
      }
   }
}

module.exports = { createBasicColors, findOrCreateColor };
