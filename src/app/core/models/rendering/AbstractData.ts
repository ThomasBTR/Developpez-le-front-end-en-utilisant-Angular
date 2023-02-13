import {Dataset} from "./Dataset";

export interface AbstractData {
  labels?: Array<any>;
  datasets?: Dataset[];
}
