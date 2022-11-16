class DayEvent {
    // Firestore와 로컬 앱과의 Serializer&Deserializer역할을 하는 클래스 입니다.
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
    // string형태로 변환된 json객체들(이벤트들)을 위의 `DayEvent`클래스로 변환합니다.
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
    // `DayEvent`클래스의 정보를 object정보로 변환합니다.
    return {
        title: event.title,
        description: event.description,
        label: event.label,
        day: event.day,
        id: event.id
    };
}

export {DayEvent, convertToDayEvent, convertToObject};