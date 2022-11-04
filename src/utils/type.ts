class DayEvent {
    title: string;
    description: string;
    label: string;
    day: number;
    id: number;

    constructor(title: string,
                description: string,
                label: string,
                day: number,
                id: number) {
        this.title = title;
        this.description = description;
        this.label = label;
        this.day = day;
        this.id = id;
    }
}

const convertToDayEvent = (event: string): DayEvent => {
    const v = JSON.parse(event)
    if (!v['title']) {
        console.error(`I can't parse this value: ${JSON.stringify(v)}`)
    }
    const result = new DayEvent(v['title'],
        v['description'],
        v['label'],
        v['day'],
        v['id'])

    return result;
}

const convertToObject = (event: DayEvent): object => {
    return {
        title: event.title,
        description: event.description,
        label: event.label,
        day: event.day,
        id: event.id
    };
}

export {DayEvent, convertToDayEvent, convertToObject};