output=output
output-linux=$(output)/linux

build: build-linux

build-linux:
  #############
	## General ##
	#############
	test -d $(output) || mkdir $(output)
	# Test if the output folder exists. If not create it.
	test -d $(output-linux) || mkdir $(output-linux)
	# Remove all files in the output folder
	rm -rfv $(output-linux)/*

  ############
  ## Server ##
  ############
	# Build the Go server
	cd server && go build -o scany-server

  ############
  ## Client ##
  ############
	# Copy server to client
	cp server/scany-server desktop/build/scany-server
	# Install dependencies
	cd desktop && yarn
	# Build client fontend
	cd desktop && yarn run build
	# Copy the frontend build to the output folder	
	mv desktop/build/*.AppImage $(output-linux)

  ###############
	## Packaging ##
  ###############
	# Compress the output to a release package
	zip -r $(output-linux).zip $(output-linux)
	tar -zcvf $(output-linux).tar.gz $(output-linux)