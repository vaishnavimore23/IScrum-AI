// Function to convert video

// get the file name from videocall.html
//const filename = getfilename();
//console.log("The filename is:", filename);
// Load EmailJS library
//
//const script = document.createElement('script');
////script.src = 'https://cdn.emailjs.com/dist/email.min.js';
//script.src = 'https://cdn.emailjs.com/sdk/3.11.0/email.min.js'
//script.onload = () =>
//{
//emailjs.init("9vF2PLlbmJ-hCSLhR"); // Initialize with your User ID or Public Key
//console.log('emailjs initialized ...')
//};
//document.head.appendChild(script);


let textToSummarize;
let summarizedText;

async function convertToWav(filename) {
console.log("filename is ----",filename);
    try {

        const response = await fetch('http://127.0.0.1:5000/convertToWav', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin':'http://127.0.0.1:5000/',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filename }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error('Error converting video:', error);
    }
}

// Function to transcribe audio
async function transcribeAudio(filename) {
    try {
        const response = await fetch('http://127.0.0.1:5000/transcribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'Access-Control-Allow-Origin':'http://127.0.0.1:5000/',
            },
            body: JSON.stringify({ filename }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Transcription:', data.transcription);
        textToSummarize = data.transcription;
    } catch (error) {
        console.error('Error transcribing audio:', error);
    }
}

// Function to summarize text
async function summarizeText(textToSummarize) {
    try {
        const response = await fetch('http://127.0.0.1:5000/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'Access-Control-Allow-Origin':'http://127.0.0.1:5000/',
            },
            body: JSON.stringify({ textToSummarize }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Summary:', data.summary);
        summarizedText = data.summary;
         sendEmail(summarizedText);

    } catch (error) {
        console.error('Error summarizing text:', error);
    }
}

// new function for text to adutio
// Function to transcribe audio
async function transcribeAudio2(filename) {
    try {
        const response = await fetch('http://127.0.0.1:5000/transcribenew', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'Access-Control-Allow-Origin':'http://127.0.0.1:5000/',
            },
            body: JSON.stringify({ filename }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Transcription:', data.transcription);
        textToSummarize = data.transcription;
    } catch (error) {
        console.error('Error transcribing audio:', error);
    }
}


function sendEmail(summarizedText) {
    const templateParams = {
        summary: summarizedText,
        to_email: 'vaishnavimore23@outlook.com' // Replace with the actual recipient email
    };

    emailjs.send('service_x30moss', 'template_ckk756p', templateParams)
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
        }, function(error) {
            console.error('Failed to send email:', error);
        });
}

//// Example usage
//const filename = 'your_video_filename'; // replace with your actual filename without extension
//const audioFilename = 'your_audio_filename'; // replace with your actual audio filename without extension
//const textToSummarize = 'This is the text to summarize.'; // replace with your actual text

async function processVideo(filename) {
    await convertToWav(filename);
    await transcribeAudio(filename);
    await summarizeText(textToSummarize);
    transcribeAudio2(filename);
}

// Call the function with the actual filename
processVideo(filename);

//convertToWav(filename);         // Convert the video
//transcribeAudio(filename); // Transcribe the audio
//summarizeText(textToSummarize); // Summarize the text
