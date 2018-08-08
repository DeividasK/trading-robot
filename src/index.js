import "babel-polyfill";
import addTimestamps from "console-stamp";

addTimestamps(console, "HH:MM:ss.l");

import { repeat } from "./utils/repeat";
import { trade } from "./trader";

repeat(trade);
