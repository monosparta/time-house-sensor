const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const protoPath = "./src/services/grpc/SeatDrawer.proto";
const md = new grpc.Metadata();
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: false,
};

let SeatDrawerProto = protoLoader.loadSync(protoPath, options);
const SeatDrawerService =
  grpc.loadPackageDefinition(SeatDrawerProto).SeatDrawer;

// async function a() {
function main(){
  const drawer = new SeatDrawerService(
    process.env.RPC_HOST + ":" + process.env.RPC_PORT,
    grpc.credentials.createInsecure()
  );
  // console.log('sdf')
  // drawer.drawSpecificSeat({ index: 1, state: 2 }, (err, response)=> {
  //   console.log(response.result);
  // });
}
main()

// const [err, result] = new Promise((resolve, reject) =>
//   drawer.drawSpecificSeat({ index: 1, state: 2 }, function (err, response) {
//     if (err) {
//       return reject(err);
//     }
//     return resolve(response);
//   })
// )
//   .then((res) => {
//     return [null, res];
//   })
//   .catch((err) => {
//     return [err, null];
//   });
// console.log(result);
// process.exit()
// }
// a();
// grpc.closeClient(drawer);

// module.exports = client;
