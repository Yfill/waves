export default class Waves {
    mainColor: string | undefined;
    static run(mainColor?: string): Waves;
    static destroy(): void | undefined;
    constructor(mainColor?: string);
    destroy(): void;
}
