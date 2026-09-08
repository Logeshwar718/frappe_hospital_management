# Copyright (c) 2026, logeshwar and Contributors
# See license.txt

import frappe
from frappe.tests import IntegrationTestCase


EXTRA_TEST_RECORD_DEPENDENCIES = []
IGNORE_TEST_RECORD_DEPENDENCIES = []


class IntegrationTestArticle(IntegrationTestCase):

    def test_article_creation(self):
        article = frappe.get_doc({
            "doctype": "Article",
            "title": "My First Test",
            "status": "Published"
        })

        article.insert()

        self.assertEqual(article.title, "My First Test")

        self.assertTrue(
            frappe.db.exists("Article", article.name)
        )