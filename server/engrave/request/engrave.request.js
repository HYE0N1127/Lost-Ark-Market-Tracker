export class EngraveRequest {
  #sort;
  #code;
  #grade;
  #sortCondition;
  #page;

  constructor(sort, code, grade, sortCondition, page = 1) {
    this.#sort = sort;
    this.#code = code;
    this.#grade = grade;
    this.#sortCondition = sortCondition;
    this.#page = page;
  }

  get() {
    // new RequestBodyModel() 인스턴스를 생성하여 반환합니다.
    return {
      Sort: this.#sort,
      CategoryCode: this.#code,
      ItemGrade: this.#grade,
      SortCondition: this.#sortCondition,
      PageNo: this.#page, // API 요청에 맞게 속성 이름은 PageNo로 변경
    };
  }
}
