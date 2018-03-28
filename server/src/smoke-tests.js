const {db} = require('../util/common')

// useful snippet to get db column names to return
// perl -ne 's/^\s+`(.*)`.*/\1/ and print "$myvar.$1,\n"; /CREATE[^"]*"(..)/ and $myvar=$1' cloud.sql

module.exports = (req, res) => {
  const rows = db
    .prepare(
      `SELECT
      sm.id, sm.project_id, sm.environment_id, sm.app_yaml_md5, sm.ee_composer_version, sm.composer_lock_md5, 
      sm.composer_lock_mtime, sm.cumulative_cpu_percent, sm.not_valid_index_count, sm.catalog_product_entity_count, 
      sm.catalog_category_product_count, sm.admin_user_count, sm.store_count, sm.order_count, sm.cms_block_count, 
      sm.template_count, sm.last_login_customer, sm.last_login_admin, sm.http_status, sm.store_url_uncached, sm.store_url_cached, 
      sm.cat_url, sm.cat_url_product_count, sm.cat_url_uncached, sm.cat_url_partial_cache, sm.cat_url_cached, sm.german_check, 
      sm.venia_check, sm.admin_check, sm.error_logs, sm.utilization_start, sm.utilization_end, sm.timestamp,
      pr.region, pr.title project_title,
      en.id environment_id, en.title environment_title, en.machine_name,
      ce.host_name, ce.expiration
    FROM 
      (SELECT * from smoke_tests GROUP BY project_id, environment_id ORDER BY id DESC) AS sm
    LEFT JOIN projects pr ON sm.project_id = pr.id
    LEFT JOIN environments en ON sm.environment_id = en.id AND sm.project_id = en.project_id 
    LEFT JOIN cert_expirations ce ON ce.host_name = en.machine_name || '-' || sm.project_id || '.' || pr.region || '.magentosite.cloud'`
    )
    .all()
  res.json(rows)
}