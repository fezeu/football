const PROXY_CONFIG = [
    {
        context:['/images'],
            target: "http://localhost:3000",
            secure: false,
            "pathRewrite": {
                "^/images": ""
              },
              "logLevel": "debug"
        
      },
  {
      
      context: [
          "/photoequipe",
          "/equipe",
          "/carton",
          "/joueur",
          "/terrain",
          "/user",
          "/login",
          "/tournois",
          "/basique_info",
          "/logout",
          "/tournois",
          "/tournois_create",
          "/arbitre",
          "/match",
          "/match_poule",
          "/poule",
          "/poule_all",
          "/match_equipes",
          "/default"
      ],
      target: "http://localhost:3000",
      secure: false,
      "logLevel": "debug"
      
  }

]

module.exports = PROXY_CONFIG;