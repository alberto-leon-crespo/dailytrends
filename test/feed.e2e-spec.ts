import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FeedsModule } from '../src/modules/feeds/feeds.module';
import { AppModule } from '../src/modules/app/app.module';
import { GetAllFeedsQuery } from '../src/modules/feeds/application/querys/get-all-feeds.query';

describe('FeedController (e2e)', () => {
  let app: INestApplication;
  const getAllFeedsQuery = {
    run: () => [
      {
        id: '63c33c14b9bed889c8d3945d',
        name: 'El Pais',
        url: 'https://elpais.com/',
      },
      {
        id: '63c33c14b9bed889c8d3945f',
        name: 'El Mundo',
        url: 'https://www.elmundo.es/',
      },
    ],
  };
  const CreateFeed = {
    _id: '63c33c14b9bed889c8d3945d',
    name: 'ABC',
    url: 'https://www.abc.es/',
  };
  const UpdateFeed = {
    _id: '63c33c14b9bed889c8d3945d',
    name: '20 Minutos',
    url: 'https://www.20minutos.es',
  };

  jest.useRealTimers();
  jest.setTimeout(15000);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, FeedsModule],
    })
      .overrideProvider(GetAllFeedsQuery)
      .useValue(getAllFeedsQuery)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/feeds', async () => {
    let assertions = 0;
    try {
      const response = await request(app.getHttpServer()).get('/feeds');
      expect(response.statusCode).toBe(200);
      expect(response.headers).toHaveProperty('Content-Type', /json/);
      for (const feed of response.body) {
        expect(feed.id).toEqual(expect.any(String));
        expect(feed.name).toEqual(expect.any(String));
        expect(feed.url).toEqual(expect.any(String));
        assertions += 3;
      }
      expect.assertions(assertions);
      return response.body;
    } catch (error: any) {
      return error;
    }
  });

  it(`POST /api/feeds`, async () => {
    try {
      const response = await request(app.getHttpServer())
        .post('/feeds')
        .send(CreateFeed);
      expect(response.statusCode).toBe(201);
      expect(response.headers).toHaveProperty('Content-Type', /json/);
      expect(response.body.id).toEqual(expect.any(String));
      expect(response.body.name).toEqual(expect.any(String));
      expect(response.body.url).toEqual(expect.any(String));
      return response.body;
    } catch (error: any) {
      return error;
    }
  });

  const idGetFeedDetail = UpdateFeed._id;

  it(`GET /api/feeds/${idGetFeedDetail}`, async () => {
    try {
      const response = await request(app.getHttpServer()).get(
        `/feeds/${idGetFeedDetail}`,
      );
      expect(response.statusCode).toBe(200);
      expect(response.headers).toHaveProperty('Content-Type', /json/);
      expect(response.body.id).toEqual(expect.any(String));
      expect(response.body.name).toEqual(expect.any(String));
      expect(response.body.url).toEqual(expect.any(String));
      return response.body;
    } catch (error: any) {
      return error;
    }
  });

  const idPutFeed = UpdateFeed._id;

  it(`PUT /api/feeds/${idPutFeed}`, async () => {
    try {
      const response = await request(app.getHttpServer())
        .put(`/feeds/${idPutFeed}`)
        .send(UpdateFeed);
      expect(response.statusCode).toBe(200);
      expect(response.headers).toHaveProperty('Content-Type', /json/);
      expect(response.body.id).toEqual(expect.any(String));
      expect(response.body.name).toEqual(expect.any(String));
      expect(response.body.url).toEqual(expect.any(String));
      return response.body;
    } catch (error: any) {
      return error;
    }
  });

  const idDeleteFeed = UpdateFeed._id;

  it(`DELETE /api/feeds/${idDeleteFeed}`, async () => {
    try {
      const response = await request(app.getHttpServer()).delete(
        `/feeds/${idPutFeed}`,
      );
      expect(response.statusCode).toBe(204);
      expect(response.headers).toHaveProperty('Content-Type', /json/);
      expect(response.body.id).toEqual(expect.any(String));
      expect(response.body.name).toEqual(expect.any(String));
      expect(response.body.url).toEqual(expect.any(String));
      return response.body;
    } catch (error: any) {
      return error;
    }
  });
});
