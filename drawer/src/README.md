# The main proto in /\<repo\>/protos

## command to produce the two pb2 files supporting

python -m grpc_tools.protoc --proto_path=./src ./src/SeatDrawer.proto --python_out=. --grpc_python_out=.
