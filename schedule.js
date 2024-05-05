// handlebars parse the schedule data from schedule.jsonc using json5 and render the schedule
// schedule.hbs is the handlebars template
// schedule.jsonc is the schedule data in json5 format

import handlebars from 'handlebars';
import stripJsonComments from 'strip-json-comments';
import fs from 'fs';
import path from 'path';

const scriptDir = path.dirname(new URL(import.meta.url).pathname);

handlebars.registerHelper('debug', function (value) {
    // e.g. {{debug this}}
    console.log('========================================');
    console.log('debug: ' + JSON.stringify(value, null, 4));
    console.log('========================================');
});

handlebars.registerHelper('imageName', (name) => name.toLowerCase().replace(/ /g, '-').replace(/\./g, ''));

handlebars.registerHelper('bio', (id, bios, property) => (bios[id] ? bios[id][property] : ''));

const updateSchedule = () => {
    const agendaPartial = fs.readFileSync(path.join(scriptDir, 'agenda.hbs'), 'utf8');
    handlebars.registerPartial('agenda', agendaPartial);

    const scheduleTemplate = handlebars.compile(fs.readFileSync(path.join(scriptDir, 'schedule.hbs'), 'utf8'));

    try {
        const schedule = JSON.parse(stripJsonComments(fs.readFileSync(path.join(scriptDir, 'schedule.jsonc'), 'utf8')));
        const scheduleHtml = scheduleTemplate(schedule);
        fs.writeFileSync(path.join(scriptDir, 'public', 'schedule.html'), scheduleHtml);
    } catch (error) {
        const red = '\x1b[31m';
        const reset = '\x1b[0m';

        if (error instanceof SyntaxError) {
            const { message } = error;
            console.error(`${red}JSON syntax error: ${message}${reset}`);
        } else {
            console.error('Error updating schedule:', error);
        }
    }
};

const watchPaths = [
    path.join(scriptDir, 'schedule.hbs'),
    path.join(scriptDir, 'agenda.hbs'),
    path.join(scriptDir, 'schedule.jsonc')
];

watchPaths.forEach((filePath) => {
    fs.watch(filePath, { persistent: true }, (eventType, filename) => {
        if (eventType === 'change' && filename) {
            console.log(`${filename} ${eventType}`);
            updateSchedule();
        }
    });
});
