output=output
output-linux=$(output)/linux

build: build-linux

build-linux:
	test -d $(output) || mkdir $(output)
	# Test if the output folder exists. If not create it.
	test -d $(output-linux) || mkdir $(output-linux)
	# Remove all files in the output folder
	rm -rfv $(output-linux)/*
	# Install dependencies
	cd client && yarn install
	# Build React fontend
	cd client && yarn build
	# Copy the frontend build to the output folder	
	mv client/dist $(output-linux)
	# Build the Go server
	cd server && go build -o godoxie
	# Copy Go server to output directory
	mv server/godoxie $(output-linux)
	# Compress the output to a release package
	zip -r $(output-linux).zip $(output-linux)
	tar -zcvf $(output-linux).tar.gz $(output-linux)