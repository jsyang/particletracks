# particletracks

A procedural art widget drawing inspiration from bubble / cloud chambers used to study particle trajectories.

![1](http://i.imgur.com/s2jm631.gif)

## Demo

[http://jsyang.ca/particletracks/](http://jsyang.ca/particletracks/)

## Specifying options by URL

You can specify options to the `particles` module via [query string](https://en.wikipedia.org/wiki/Query_string): see `src/particles.js` for a comprehensive list of options and their effects.

** Ex: Start with 10000 particles **
```
http://jsyang.ca/particletracks/?count=10000
```

** Clear particle trails per frame and start with 5000 particles **
```
http://jsyang.ca/particletracks/?shouldClearTracksPerFrame=true&count=5000
```

** Set the maximum lifespan of a particle to 20 frames **
```
http://jsyang.ca/particletracks/?lifespan=20
```


