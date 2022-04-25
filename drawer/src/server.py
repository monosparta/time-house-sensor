import os
import grpc
from concurrent import futures
import draw

import SeatDrawer_pb2
import SeatDrawer_pb2_grpc

class SeatDrawerServicer(SeatDrawer_pb2_grpc.SeatDrawerServicer):
    def drawSpecificSeat(self, req):
        print("call the drawSpecificSeat function")
        response = SeatDrawer_pb2.DrewResultResponse()
        response.result = "Successfully call the drawSpecificSeat function"
        return response
    
    def drawAllSeats(self, req):
        print("call the drawAllSeats function")
        response = SeatDrawer_pb2.DrewResultResponse()
        response.result = "Successfully call the drawAllSeats function"
        return response

def main():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    SeatDrawer_pb2_grpc.add_SeatDrawerServicer_to_server(SeatDrawerServicer(), server)
    server.add_insecure_port('[::]:' + os.environ["PORT"])
    server.start()
    print('python server started')
    server.wait_for_termination()

if __name__ == '__main__':
    main()