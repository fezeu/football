const PROXY_CONFIG = [
  {
      context: [
          "/equipe",
          "/carton",
          "/joueur",
          "/terrain"
      ],
      target: "http://localhost:3000",
      secure: false
  }
]

module.exports = PROXY_CONFIG;