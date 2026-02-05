import { expect } from "chai";
import sinon from "sinon";
import main from "../../controllers/main.js";
import request from "supertest";
import app from "../../app.js";

describe("getIndex function", () => {
  it("should render index view with correct parameters", () => {
    const req = {
      i18n_texts: {
        main: "texts",
      },
    };
    const res = {
      render: sinon.spy(),
    };

    main.getIndex(req, res);

    expect(res.render.calledOnce).to.be.true;
    expect(res.render.firstCall.args[0]).to.equal("index");
    expect(res.render.firstCall.args[1]).to.deep.equal({
      coverTopic: req.i18n_texts.main,
      leftBlock: true,
      rightBlock: true,
      buttonCover: true,
      discount: true,
      coverImage: "img/cover.jpg",
      sectionTitleContact: true,
      portfolio: true,
    });
  });
});

describe("getHoreca function", () => {
  it("should render horeca view with correct parameters", () => {
    const req = {
      i18n_texts: {
        horecaTopic: "texts",
      },
    };
    const res = {
      render: sinon.spy(),
    };

    main.getHoreca(req, res);

    expect(res.render.calledOnce).to.be.true;
    expect(res.render.firstCall.args[0]).to.equal("horeca");
    expect(res.render.firstCall.args[1]).to.deep.equal({
      coverTopic: req.i18n_texts.horecaTopic,
      leftBlock: false,
      rightBlock: false,
      buttonCover: true,
      discount: false,
      coverImage: "img/horeca.png",
      isMehr: false,
      sectionTitleContact: true,
      portfolio: true,
    });
  });
});

describe("getKleideranfertigung function", () => {
  it("should render kleideranfertigung view with correct parameters", () => {
    const req = {
      i18n_texts: {
        kleiderTopic: "texts",
      },
    };
    const res = {
      render: sinon.spy(),
    };

    main.getKleideranfertigung(req, res);

    expect(res.render.calledOnce).to.be.true;
    expect(res.render.firstCall.args[0]).to.equal("kleideranfertigung");
    expect(res.render.firstCall.args[1]).to.deep.equal({
      coverTopic: req.i18n_texts.kleiderTopic,
      leftBlock: true,
      rightBlock: true,
      buttonCover: true,
      discount: true,
      coverImage: "img/kleideranfertigung.png",
      isMehr: true,
      sectionTitleContact: true,
      portfolio: true,
    });
  });
});

describe("getHeimtextilien function", () => {
  it("should render heimtextilien view with correct parameters", () => {
    const req = {
      i18n_texts: {
        heimTopic: "texts",
      },
    };
    const res = {
      render: sinon.spy(),
    };

    main.getHeimtextilien(req, res);

    expect(res.render.calledOnce).to.be.true;
    expect(res.render.firstCall.args[0]).to.equal("heimtextilien");
    expect(res.render.firstCall.args[1]).to.deep.equal({
      coverTopic: req.i18n_texts.heimTopic,
      leftBlock: true,
      rightBlock: true,
      buttonCover: true,
      discount: true,
      coverImage: "img/heimtextilien.png",
      isMehr: true,
      sectionTitleContact: true,
      portfolio: true,
    });
  });
});

describe("getMyself function", () => {
  it("should render myself view with correct parameters", () => {
    const req = {
      i18n_texts: {
        aboutTopic: "texts",
      },
    };
    const res = {
      render: sinon.spy(),
    };

    main.getMyself(req, res);

    expect(res.render.calledOnce).to.be.true;
    expect(res.render.firstCall.args[0]).to.equal("myself");
    expect(res.render.firstCall.args[1]).to.deep.equal({
      coverTopic: req.i18n_texts.aboutTopic,
      leftBlock: false,
      rightBlock: false,
      buttonCover: false,
      discount: false,
      coverImage: "img/me.png",
      sectionTitleContact: true,
      portfolio: true,
    });
  });
});

describe("getKontakte function", () => {
  it("should render kontakte view with correct parameters", () => {
    const req = {
      i18n_texts: {
        contactTopic: "texts",
      },
    };
    const res = {
      render: sinon.spy(),
    };

    main.getKontakte(req, res);

    expect(res.render.calledOnce).to.be.true;
    expect(res.render.firstCall.args[0]).to.equal("kontakte");
    expect(res.render.firstCall.args[1]).to.deep.equal({
      coverTopic: req.i18n_texts.contactTopic,
      sectionTitleContact: false,
      portfolio: false,
    });
  });
});

describe("sendEmail", () => {
  it("should send response 400 with validation errors", async () => {
    await request(app)
      .post("/send-email")
      .send({
        inputName: "",
        inputEmail: "johnexample.com",
        inputTel: "123A56789",
        inputKomm: "Hello, this is a test message.",
      })
      .expect(400);
  });

  it("should send response 200 with no validation errors", async () => {
    await request(app)
      .post("/send-email")
      .send({
        inputName: "John Doe",
        inputEmail: "john@example.com",
        inputTel: "123456789",
        inputKomm: "Hello, this is a test message.",
      })
      .expect(200);
  });
});

describe("sendFeedback", () => {
  it("should send response 400 with validation errors", async () => {
    await request(app)
      .post("/send-feedback")
      .send({
        feedbackName: "",
        feedbackLink: "not a link",
        feedbackMessage: "",
      })
      .expect(400);
  });

  it("should send response 200 with no validation errors", async () => {
    await request(app)
      .post("/send-feedback")
      .send({
        feedbackName: "John Doe",
        feedbackLink: "link.com",
        feedbackMessage: "Feedback text",
      })
      .expect(200);
  });
});

describe("getSetEn", () => {
  it("should set cookie and redirect back", () => {
    const req = {};
    const res = {
      cookie: sinon.spy(),
      redirect: sinon.spy(),
    };

    main.getSetEn(req, res);

    expect(res.cookie.calledOnce).to.be.true;
    expect(
      res.cookie.calledWith("ulang", "en", { maxAge: 900000, httpOnly: true })
    ).to.be.true;

    expect(res.redirect.calledOnce).to.be.true;
    expect(res.redirect.calledWith("back")).to.be.true;
  });
});

describe("getSetDe", () => {
  it("should set cookie and redirect back", () => {
    const req = {};
    const res = {
      cookie: sinon.spy(),
      redirect: sinon.spy(),
    };

    main.getSetDe(req, res);

    expect(res.cookie.calledOnce).to.be.true;
    expect(
      res.cookie.calledWith("ulang", "de", { maxAge: 900000, httpOnly: true })
    ).to.be.true;

    expect(res.redirect.calledOnce).to.be.true;
    expect(res.redirect.calledWith("back")).to.be.true;
  });
});
