const request = require("supertest");
const app = require("../../src/app");

const seatProperties = require("../../src/utils/seat")


describe("GET /api/seatsInfo", () => {
  it("check seat index and the content should be taken correctly", async () => {
    const res = await request(app).get(
      "/api/seatsInfo"
    );

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty("detail");
    expect(res.body.detail).toEqual("成功取得所有位置資訊");

    expect(res.body).toHaveProperty("seats");
    const seats = res.body.seats;
    for (let seat of seats) {

      expect(seat.id).toBeGreaterThanOrEqual(seatProperties.indexRange.min)
      expect(seat.id).toBeLessThanOrEqual(seatProperties.indexRange.max)

      expect(seat.state).toBeGreaterThanOrEqual(seatProperties.stateRange.min)
      expect(seat.state).toBeLessThanOrEqual(seatProperties.stateRange.max)
      
      switch (seat.state) {
        case -1:
          expect(seat.idleMinutes).toEqual(0);
          break;
        case 0: 
          expect(seat.idleMinutes).toEqual(0);  
          break;
        case 1: 
          expect(seat.memberId).toBeNull();
          expect(seat.idleMinutes).toEqual(0);
          break;
        case 2:
          expect(seat.idleMinutes).toBeGreaterThanOrEqual(30);
          break;
        default:
          fail('Seat state should in [-1, 0, 1, 2].');
      }
    }
  });
});

