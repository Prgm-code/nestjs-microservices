import { Module } from "@nestjs/common";
import { ClientProxySuperFlights } from "./clent.proxy";

@Module({
    providers: [ClientProxySuperFlights],
    exports: [ClientProxySuperFlights]
})

export class ProxyModule {}