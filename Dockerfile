FROM ruby:2.3-slim

ENV APP_DIR /var/www/itnovem_web_app

# Main setup
RUN apt-get update && apt-get install -y build-essential nodejs sqlite3 libsqlite3-dev git

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install --jobs 20 --retry 5

COPY . ./

EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
