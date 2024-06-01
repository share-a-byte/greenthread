## Inspiration
The fashion industry is a major contributor to environmental pollution, and many consumers are becoming increasingly aware of the need for sustainable choices. However, finding eco-friendly fashion options can be challenging and time-consuming. GreenThread was inspired by the desire to simplify this process and empower users to make informed, eco-friendly fashion choices effortlessly. Our goal is to provide an intuitive and comprehensive platform that not only educates users about sustainable fashion but also offers practical solutions and alternatives.

## What it does
GreenThread is a revolutionary app designed to help users make eco-friendly fashion choices with ease and confidence. The app analyzes URLs for harmful ingredients and evaluates the sustainability of fashion items. It features a custom sustainability score system for brands and products, based on factors like materials used and environmental impact. GreenThread also informs users on why the materials in the products they have submitted are environmentally friendly or not environmentally friendly. Additionally, GreenThread suggests alternative eco-friendly brands and products across a wide price range, ensuring that everyone can afford to buy environmentally friendly products. Users can easily compare products, view detailed sustainability reports, and make purchases directly through the app.

## How we built it
GreenThread was built using a combination of Next.js, Tailwind CSS, and shadcn/ui for the frontend, and Python, Flask, and BeautifulSoup for the backend. Next.js provided us with a robust and efficient framework for building a responsive and dynamic user interface. Tailwind CSS and shadcn/ui allowed us to create a visually appealing and user-friendly design. On the backend, we utilized Python and Flask to handle web scraping and data extraction. BeautifulSoup was instrumental in parsing HTML and extracting relevant information from various fashion websites. Regular expressions were used to accurately identify materials and brands from product pages. We also integrated CORS to ensure cross-origin requests are managed properly. Our sustainability score system was developed based on extensive research into the environmental impact of different materials, taking into account various factors such as production processes, recyclability, and biodegradability.

## Challenges we ran into
One of the main challenges we encountered was accurately extracting relevant information from various fashion websites, as each site has its own structure and HTML layout. Handling different encoding formats and ensuring our scraper could process them correctly was another hurdle. Integrating the frontend and backend seamlessly while maintaining a high level of performance and responsiveness was also a significant challenge. Creating a good UX design and addressing styling issues posed challenges in ensuring the app was both functional and visually appealing.

## Accomplishments that we're proud of
We are proud to have developed an app that can significantly impact how consumers make fashion choices, promoting sustainability and environmental responsibility. Successfully implementing a flexible and accurate web scraper that can handle a variety of website formats is a significant achievement. We are also proud of our custom sustainability score system, which provides valuable insights into the eco-friendliness of fashion items. Additionally, we are proud of the seamless integration of our frontend and backend, creating a cohesive and intuitive user experience. Our ability to offer users a wide range of alternative eco-friendly products through our custom API across different price points is another accomplishment that we are proud of.

## What we learned
Throughout the development of GreenThread, we learned a great deal about the complexities of web scraping and the importance of handling different data formats. We also gained a deeper understanding of the environmental impacts of various materials used in the fashion industry. Additionally, we learned how to balance functionality and user-friendliness to create an app that meets users' needs effectively. Our experience with Next.js, Tailwind CSS, and shadcn/ui taught us valuable lessons about building responsive and aesthetically pleasing user interfaces. We also learned the importance of thorough research and validation when developing a sustainability scoring system.

## What's next for GreenThread
The next steps for GreenThread include expanding our database of brands and products to provide users with even more options. We plan to enhance our algorithm to provide more detailed and accurate sustainability scores, incorporating additional factors such as supply chain transparency and labor practices. Additionally, we aim to develop a user-friendly mobile app version of GreenThread to reach a broader audience. We also plan to introduce features such as personalized recommendations, user reviews, and a community forum for sharing tips and experiences related to sustainable fashion.

## Backend instructions
Start a virtual environment with Python 3.9, install the required packages using the requirements.txt file. Run export FLASK_APP=scraper.py, then flask run in the terminal.

## Frontend instructions

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
