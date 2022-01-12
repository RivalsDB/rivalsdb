export interface Service {
  run(): Promise<void>;
  shutdown(): Promise<void>;
}
