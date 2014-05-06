package controllers

import "github.com/revel/revel"
import "fmt"

type Templates struct {
	*revel.Controller
}

func (c Templates) Render(templatePath string) revel.Result {
	return c.RenderTemplate(fmt.Sprintf("templates/%s.html", templatePath))
}
