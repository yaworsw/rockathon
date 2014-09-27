require 'mongo'

client = Mongo::MongoClient.from_uri
db     = client.db('emails')

use Rack::Static,
  :urls => ['/resources', '/js', '/css'],
  :root => 'public'

run lambda { |env|
  req = Rack::Request.new(env)
  if req.post?
    node = Rack::Utils.parse_query(req.body.read)
    if not node['email'].nil? and node['email'] =~ /^\S+@\S+\.\S+$/
      client['heroku_app30073674']['emails'].insert({ :email => node['email'] })
    end
  end
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('public/index.html', File::RDONLY)
  ]
}
