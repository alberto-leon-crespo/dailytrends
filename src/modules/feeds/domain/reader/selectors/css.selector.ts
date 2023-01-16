export class CssSelector {
  private value: any;
  public constructor(private cssQuery: string, private fieldName: string) {}

  public setValue(value: any) {
    this.value = value;
  }

  public getValue() {
    return this.value;
  }

  public getFieldName() {
    return this.fieldName;
  }

  public getCssQuery() {
    return this.cssQuery;
  }
}
