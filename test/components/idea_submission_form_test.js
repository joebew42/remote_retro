import React from "react"
import { mount } from "enzyme"
import { expect } from "chai"
import sinon from "sinon"

import IdeaSubmissionForm from "../../web/static/js/components/idea_submission_form"
describe("IdeaSubmissionForm component", () => {
  let wrapper

  const onSubmitIdeaStub = () => {}
  const fakeEvent = {
    stopPropagation: ()=> undefined,
    preventDefault: ()=> undefined,
  }

  describe("on submit", () => {
    it("invokes the function passed as the onIdeaSubmission prop", () => {
      const onSubmitIdeaSpy = sinon.spy(() => {})
      wrapper = mount(<IdeaSubmissionForm onIdeaSubmission={ onSubmitIdeaSpy }/>)

      wrapper.simulate("submit", fakeEvent)

      expect(onSubmitIdeaSpy.called).to.equal(true)
    })

    describe("when the category input lacks focus", () => {
      beforeEach(() => {
        wrapper = mount(<IdeaSubmissionForm onIdeaSubmission={ onSubmitIdeaStub }/>)
        wrapper.find("input[name='idea']").node.focus()
      })

      it("resets the focus to the category input", () => {
        const categorySelect = wrapper.find("select")

        expect(document.activeElement).not.to.equal(categorySelect.node)
        wrapper.simulate("submit", fakeEvent)
        expect(document.activeElement).to.equal(categorySelect.node)
      })
    })
  })

  describe("when a category is selected", () => {
    it("shifts focus to the idea input", () => {
      wrapper = mount(<IdeaSubmissionForm onIdeaSubmission={ onSubmitIdeaStub }/>)

      const ideaInput = wrapper.find("input[name='idea']")
      const categorySelect = wrapper.find("select")

      expect(document.activeElement).not.to.equal(ideaInput.node)
      categorySelect.simulate('change')
      expect(document.activeElement).to.equal(ideaInput.node)
    })
  })
})

