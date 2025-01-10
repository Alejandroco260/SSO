import { Module } from "@nestjs/common";

@Module({
    providers:[],
    exports:[ LibsModule]
})
export class LibsModule{}