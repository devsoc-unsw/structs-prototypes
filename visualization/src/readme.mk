## Project Structure
The project is structured as follows:

```
app.tsx
├── components
│   ├── drawable (The entity which shown at final screen)
│   │   ├── drawable.tsx
│   ├── state (The type definition of formatted data that can be passed into the system)
│   │   ├── state.tsx
|	|	|── arrayDsParser.ts
```

The `app.tsx` is the main entry point of the application. It is responsible for rendering the `Drawable` component. 
