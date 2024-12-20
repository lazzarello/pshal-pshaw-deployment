import { stimuliList } from './trials.js';

// Initialize jsPsych
const jsPsych = initJsPsych({
    override_safe_mode: true,
});

console.log('hallo');

// Function to create trials dynamically
const createTrials = (stimuli) => {
    return stimuli.map(item => {
        switch (item.type) {
            case "audio":
                return {
                    type: jsPsychAudioKeyboardResponse,
                    stimulus: 'stimuli/'+item.file,
                    choices: "NO_KEYS",
                    //trial_ends_after_audio: true
                    trial_duration: 3000
                };
            case "word":
                return {
                    type: jsPsychHtmlKeyboardResponse,
                    stimulus: `<div class="word">${item.text}</div>`,
                    choices: "NO_KEYS",
                    trial_duration: 3000
                };
            case "text":
                return {
                    type: jsPsychHtmlButtonResponse,
                    stimulus: `<div class="text">${item.text.replace(/\|/g, '<br>')}</div>`,
                    choices: ['click to continue'],
                    promt:"Click",
                    trial_duration: null
                };
            default:
                console.warn(`Unknown type: ${item.type}`);
                return null;
        }
    }).filter(trial => trial !== null); // Filter out any null trials
};

// Generate the trials from the stimuli list
const trials = createTrials(stimuliList);

// Inter-trial interval with fixation cross
const fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div style="font-size: 48px;">+</div>`,
    choices: "NO_KEYS",
    trial_duration: 1000
};

// Combine trials with fixation cross
const timeline = [];
trials.forEach(trial => {
    timeline.push(trial);
    timeline.push(fixation);
});

// Run the experiment
jsPsych.run(timeline);
