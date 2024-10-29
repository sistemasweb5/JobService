export class Location {
  constructor(
    public readonly latitude: number,
    public readonly longitude: number,
  ) {}

  toPoint(): string {
    return `POINT(${this.longitude} ${this.latitude})`;
  }
}
