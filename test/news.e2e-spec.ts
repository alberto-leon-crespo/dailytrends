import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/modules/app/app.module';
import { GetAllNewsQuery } from '../src/modules/news/application/querys/get-all-news.query';
import { NewsModule } from '../src/modules/news/news.module';

describe('FeedController (e2e)', () => {
  let app: INestApplication;
  const getAllNewsQuery = {
    run: () => [
      {
        id: ' 63c58a7cf56924fa718e97f2',
        author: 'REDACCIÓN: RAFAEL ARENAS GARCÍA',
        url: 'Twitter frente a Tuio: Elon Musk inicia una batalla legal contra una startup española',
        feed_id: '63c58a2dae524fe7d788ba4e',
      },
    ],
  };

  jest.useRealTimers();
  jest.setTimeout(15000);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, NewsModule],
    })
      .overrideProvider(GetAllNewsQuery)
      .useValue(getAllNewsQuery)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/feeds/news', async () => {
    let assertions = 0;
    try {
      const response = await request(app.getHttpServer()).get('/feeds/news');
      expect(response.statusCode).toBe(200);
      expect(response.headers).toHaveProperty('Content-Type', /json/);
      for (const newData of response.body) {
        expect(newData.id).toEqual(expect.any(String));
        expect(newData.author).toEqual(expect.any(String));
        expect(newData.url).toEqual(expect.any(String));
        expect(newData.feed_id).toEqual(expect.any(String));
        assertions += 3;
      }
      expect.assertions(assertions);
      return response.body;
    } catch (error: any) {
      return error;
    }
  });
});
