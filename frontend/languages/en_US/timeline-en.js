if (typeof links === 'undefined') {
    links = {};
    links.locales = {};
} else if (typeof links.locales === 'undefined') {
    links.locales = {};
}

links.locales['en'] = {
    'MONTHS': new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"),
    'MONTHS_SHORT': new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"),
    'DAYS': new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"),
    'DAYS_SHORT': new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"),
    'ZOOM_IN': "Zoom in",
    'ZOOM_OUT': "Zoom out",
    'MOVE_LEFT': "Move left",
    'MOVE_RIGHT': "Move right",
    'NEW': "New",
    'CREATE_NEW_EVENT': "Create new event"
};

links.locales['en_US'] = links.locales['en'];
links.locales['en_UK'] = links.locales['en'];
links.locales['en_UK'] = links.locales['en'];