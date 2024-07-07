# Elastic Stack Docker Compose Setup

This repository contains a Docker Compose setup for deploying the Elastic Stack components:

- Elasticsearch
- Kibana
- Logstash

## Prerequisites

Before you begin, ensure you have Docker and Docker Compose installed on your system.

## Usage

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Create a .env file and set passwords for Elasticsearch (ELASTIC_PASSWORD) and Kibana (KIBANA_PASSWORD). For example:

   ```bash
   ELASTIC_PASSWORD=myelasticpassword
   KIBANA_PASSWORD=mykibanapassword
   ```

3. Start the services:

   ```bash
   docker compose up -d
   ```

4. Access the services:

   - Elasticsearch: http://localhost:9200
   - Kibana: http://localhost:5601
   - Logstash: Configuration is mounted from logstash.conf

5. Stop the services:
   ```bash
   docker compose down
   ```

## Services

- Elasticsearch
  Image: docker.elastic.co/elasticsearch/elasticsearch:8.14.0
  Ports: 9200 (HTTP), 9300 (TCP)
  Environment:
  ELASTIC_PASSWORD: Password for Elasticsearch authentication
  xpack.security.enabled: true for enabling security (commented out in the provided setup)
  Volumes: esdata for data persistence

- Kibana
  Image: docker.elastic.co/kibana/kibana:8.14.0
  Ports: 5601
  Environment:
  ELASTICSEARCH_HOSTS: URL of Elasticsearch
  ELASTICSEARCH_USERNAME: Username (kibana_system) for Elasticsearch
  ELASTICSEARCH_PASSWORD: Password for Elasticsearch authentication
  ELASTICSEARCH_SSL_VERIFICATIONMODE: SSL verification mode set to none (for development)
  TELEMETRY_ENABLED=false to disable telemetry

- Logstash
  Image: docker.elastic.co/logstash/logstash:8.14.0
  Ports: 5044 (Beats input), custom UDP port (configured via environment variable), 9600 (Monitoring API)
  Environment:
  ELASTIC_USER: Username (elastic) for Elasticsearch
  ELASTIC_PASSWORD: Password for Elasticsearch authentication
  ELASTIC_HOSTS: URL of Elasticsearch
  xpack.monitoring.enabled=false to disable X-Pack monitoring
  Volumes: logstash.conf for configuration, output.log for log output

## Setup Service

- Image: docker.elastic.co/elasticsearch/elasticsearch:8.14.0

- Environment:
  ELASTIC_PASSWORD: Password for Elasticsearch authentication
  KIBANA_PASSWORD: Password for Kibana authentication

- Command: Sets passwords for kibana_system user in Elasticsearch

## Notes

This setup uses Docker Compose to orchestrate the Elastic Stack services. Adjustments to configuration files (docker-compose.yml, .env, logstash.conf) may be necessary based on your specific requirements. Ensure adequate system resources (e.g., memory) are available for running Elasticsearch.
