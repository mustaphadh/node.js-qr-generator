import inquirer from "inquirer";
import qr from 'qr-image';
import fs from 'fs';

async function generateQRCode() {
    // 1. Use the inquirer npm package to get user input
    const { link } = await inquirer.prompt([{
        name: 'link',
        message: "Enter your link to turn it to a QR code: ",
        type: 'input',
    }]);

    // 2. Use the qr-image npm package to turn the user-entered URL into a QR code image
    const qr_png = qr.image(link, { type: 'png' });

    // 3. Create a txt file to save the user input using the native fs node module
    qr_png.pipe(fs.createWriteStream('myqrcode.png'));

    // Save the link in a txt file
    fs.writeFileSync('link.txt', link, 'utf-8');
    console.log("QR code and link.txt have been created!");
}

// Call the async function
generateQRCode();
