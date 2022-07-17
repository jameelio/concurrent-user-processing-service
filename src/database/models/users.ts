import { ObjectId } from "mongodb";

export default class User {
    constructor(
        public name: string, 
        public device_count: number, 
        public active_devices: string[], 
        public id?: ObjectId) {}
}
