const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const fullName = "Harivarsan_K";
const dob = "28122004";
const email = "harivarsan2004@gmail.com";
const rollNumber = "22BIT0368";

function alternatingCapsReverse(arr) {
    let alphabets = arr.join('');
    let reversed = alphabets.split('').reverse().join('');
    return reversed
        .split('')
        .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
        .join('');
}

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input, 'data' should be an array"
            });
        }

        let even_numbers = [];
        let odd_numbers = [];
        let alphabets = [];
        let special_characters = [];
        let sum = 0;

        data.forEach(item => {
            if (/^-?\d+$/.test(item)) {
                const num = parseInt(item, 10);
                if (num % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
                sum += num;
            } else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
            } else {
                special_characters.push(item);
            }
        });

        const concat_string = alternatingCapsReverse(alphabets);

        return res.status(200).json({
            is_success: true,
            user_id: `${fullName}_${dob}`,
            email: email,
            roll_number: rollNumber,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string
        });
    } catch (error) {
        return res.status(500).json({
            is_success: false,
            message: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
