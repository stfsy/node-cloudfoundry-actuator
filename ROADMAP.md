# ROADMAP

## v1.1
### Command line interface
- Implement separate cli module to create 
  - build information at build time
  - git information at build time
- Place generated files into .actuator directory

### Info Endpoint
- Read generated info files from .actuator directory

## v1.2
### Registry
- Allow adding costum actuator contributors
- Allow disabling built in actuator endpoints

## v1.3
### Health Contributors
- Allow adding health contributors
- Check status of nested health contributors to compute overall status

## v1.4
### Trace Endpoint
- Add a Trace Endpoint to allow displaying recent request on Cloud Foundry Apps Manager